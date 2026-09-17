import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']

})
export class CategoriesComponent implements OnInit {
  categorias: Categoria[] = [];
  nova: Categoria = { nome: '' };
  editandoId: number | null = null;
  erro = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.api.getCategorias().subscribe({
      next: d => this.categorias = d,
      error: () => this.erro = 'Erreur de chargement des catégories'
    });
  }

  salvar(): void {
    if (!this.nova.nome.trim()) return;
    this.erro = '';
    if (this.editandoId) {
      this.api.updateCategoria(this.editandoId, this.nova).subscribe(() => {
        this.cancelar(); this.carregar();
      });
    } else {
      this.api.createCategoria(this.nova).subscribe({
        next: () => { this.nova = { nome: '' }; this.carregar(); },
        error: (e) => this.erro = e?.error?.message || 'Erreur'
      });
    }
  }

  editar(c: Categoria): void { this.editandoId = c.id!; this.nova = { nome: c.nome }; }

  excluir(id: number): void {
    if (confirm('Exclure cette catégorie ?')) {
      this.api.deleteCategoria(id).subscribe(() => this.carregar());
    }
  }

  cancelar(): void { this.editandoId = null; this.nova = { nome: '' }; }
}
