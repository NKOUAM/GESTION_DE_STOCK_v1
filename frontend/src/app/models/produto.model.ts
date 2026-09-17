import { Categoria } from './categoria.model';
import { Fornecedor } from './fornecedor.model';

export interface Produto {
  id?: number;
  nome: string;
  descricao?: string;
  preco: number;
  quantidade: number;
  categoria?: Categoria;
  fornecedor?: Fornecedor;
}
