import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Movimentacao } from '../../models/movimentacao.model';
import { Produto } from '../../models/produto.model';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-mouvements',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './mouvements.component.html',
  styleUrls: ['./mouvements.component.css']
})
export class MouvementsComponent implements OnInit {
  produtos: Produto[] = [];
  movimentacoes: Movimentacao[] = [];
  produtoSelecionadoId: number | null = null;

  nova: Movimentacao = {
    tipo: 'ENTRADA', quantidade: 1, observacao: '',
    produto: { nome: '', preco: 0, quantidade: 0 }
  };
  erro = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getProdutos().subscribe(d => {
      this.produtos = d;
      if (d.length) { this.produtoSelecionadoId = d[0].id!; this.carregar(); }
    });
  }

  carregar(): void {
    if (!this.produtoSelecionadoId) return;
    this.api.getMovimentacoes(this.produtoSelecionadoId).subscribe(d => this.movimentacoes = d);
  }

  salvar(): void {
    this.erro = '';
    if (!this.produtoSelecionadoId) return;
    const payload: Movimentacao = {
      tipo: this.nova.tipo,
      quantidade: this.nova.quantidade,
      observacao: this.nova.observacao,
      produto: { id: this.produtoSelecionadoId, nome: '', preco: 0, quantidade: 0 }
    };
    this.api.createMovimentacao(payload).subscribe({
      next: () => {
        this.nova.observacao = '';
        this.carregar();
        this.api.getProdutos().subscribe(d => this.produtos = d);
      },
      error: (e) => this.erro = e?.error?.message || 'Erreur : stock insuffisant'
    });
  }
}
