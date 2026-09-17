import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Categoria } from '../models/categoria.model';
import { Fornecedor } from '../models/fornecedor.model';
import { Produto } from '../models/produto.model';
import { Movimentacao } from '../models/movimentacao.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = '/api';

  constructor(private http: HttpClient) {}

  // Catégories
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.base}/categorias`);
  }
  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.base}/categorias/${id}`);
  }
  createCategoria(c: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.base}/categorias`, c);
  }
  updateCategoria(id: number, c: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.base}/categorias/${id}`, c);
  }
  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/categorias/${id}`);
  }

  // Fournisseurs
  getFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${this.base}/fornecedores`);
  }
  getFornecedor(id: number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.base}/fornecedores/${id}`);
  }
  createFornecedor(f: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(`${this.base}/fornecedores`, f);
  }
  updateFornecedor(id: number, f: Fornecedor): Observable<Fornecedor> {
    return this.http.put<Fornecedor>(`${this.base}/fornecedores/${id}`, f);
  }
  deleteFornecedor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/fornecedores/${id}`);
  }

  // Produits — accepte tableau OU page Spring
  getProdutos(): Observable<Produto[]> {
    return this.http.get<any>(`${this.base}/produtos`).pipe(
      map(res => Array.isArray(res) ? res : (res.content ?? []))
    );
  }
  getProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.base}/produtos/${id}`);
  }
  createProduto(p: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.base}/produtos`, p);
  }
  updateProduto(id: number, p: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.base}/produtos/${id}`, p);
  }
  deleteProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/produtos/${id}`);
  }

  // Mouvements — accepte tableau OU page Spring
  getMovimentacoes(produtoId?: number): Observable<Movimentacao[]> {
    const url = produtoId
      ? `${this.base}/movimentacoes?produtoId=${produtoId}`
      : `${this.base}/movimentacoes`;
    return this.http.get<any>(url).pipe(
      map(res => Array.isArray(res) ? res : (res.content ?? []))
    );
  }
  createMovimentacao(m: Movimentacao): Observable<Movimentacao> {
    return this.http.post<Movimentacao>(`${this.base}/movimentacoes`, m);
  }
}
