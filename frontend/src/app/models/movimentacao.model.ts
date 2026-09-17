import { Produto } from './produto.model';

export type TipoMovimentacao = 'ENTRADA' | 'SAIDA';

export interface Movimentacao {
  id?: number;
  tipo: TipoMovimentacao;
  quantidade: number;
  observacao?: string;
  data?: string;
  produto: Produto;
}
