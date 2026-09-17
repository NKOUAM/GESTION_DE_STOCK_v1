import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Produto } from '../../models/produto.model';
import { Categoria } from '../../models/categoria.model';
import { Fornecedor } from '../../models/fornecedor.model';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']

})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  categorias: Categoria[] = [];
  fornecedores: Fornecedor[] = [];
  novo: Produto = { nome: '', descricao: '', preco: 0, quantidade: 0 };
  categoriaId: number | null = null;
  fornecedorId: number | null = null;
  editandoId: number | null = null;
  erro = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.carregar();
    this.api.getCategorias().subscribe(d => this.categorias = d);
    this.api.getFornecedores().subscribe(d => this.fornecedores = d);
  }

  carregar(): void { this.api.getProdutos().subscribe(d => this.produtos = d); }

  salvar(): void {
    this.erro = '';
    const payload: Produto = {
      ...this.novo,
      categoria: this.categoriaId ? { id: this.categoriaId, nome: '' } : undefined,
      fornecedor: this.fornecedorId ? { id: this.fornecedorId, nome: '' } : undefined
    };
    if (this.editandoId) {
      this.api.updateProduto(this.editandoId, payload).subscribe(() => { this.cancelar(); this.carregar(); });
    } else {
      this.api.createProduto(payload).subscribe({
        next: () => { this.cancelar(); this.carregar(); },
        error: (e) => this.erro = e?.error?.message || 'Erreur'
      });
    }
  }

  editar(p: Produto): void {
    this.editandoId = p.id!;
    this.novo = { ...p };
    this.categoriaId = p.categoria?.id ?? null;
    this.fornecedorId = p.fornecedor?.id ?? null;
  }

  excluir(id: number): void {
    if (confirm('Exclure ce produit ?')) this.api.deleteProduto(id).subscribe(() => this.carregar());
  }

  cancelar(): void {
    this.editandoId = null;
    this.novo = { nome: '', descricao: '', preco: 0, quantidade: 0 };
    this.categoriaId = null;
    this.fornecedorId = null;
  }
}
