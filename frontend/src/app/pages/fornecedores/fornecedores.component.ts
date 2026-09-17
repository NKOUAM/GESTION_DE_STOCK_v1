import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Fornecedor } from '../../models/fornecedor.model';

@Component({
  selector: 'app-fornecedores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit {
  fornecedores: Fornecedor[] = [];
  novo: Fornecedor = { nome: '', cnpj: '', telefone: '', email: '' };
  editandoId: number | null = null;
  erro = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void { this.api.getFornecedores().subscribe(d => this.fornecedores = d); }

  salvar(): void {
    if (!this.novo.nome.trim()) return;
    this.erro = '';
    if (this.editandoId) {
      this.api.updateFornecedor(this.editandoId, this.novo).subscribe(() => {
        this.cancelar(); this.carregar();
      });
    } else {
      this.api.createFornecedor(this.novo).subscribe({
        next: () => { this.novo = { nome: '', cnpj: '', telefone: '', email: '' }; this.carregar(); },
        error: (e) => this.erro = e?.error?.message || 'Erreur'
      });
    }
  }

  editar(f: Fornecedor): void { this.editandoId = f.id!; this.novo = { ...f }; }
  excluir(id: number): void {
    if (confirm('Exclure ce fournisseur ?')) this.api.deleteFornecedor(id).subscribe(() => this.carregar());
  }
  cancelar(): void { this.editandoId = null; this.novo = { nome: '', cnpj: '', telefone: '', email: '' }; }
}
