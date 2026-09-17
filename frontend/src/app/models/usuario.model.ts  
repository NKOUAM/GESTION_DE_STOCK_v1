export type Role = 'ADMIN' | 'GERANT' | 'MAGASINIER' | 'VENDEUR' | 'ACHETEUR' | 'COMPTABLE' | 'OBSERVATEUR';

export interface Usuario {
  id?: number;
  username: string;
  nome: string;
  email?: string;
  role: Role;
  actif?: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  id: number;
  username: string;
  nome: string;
  email: string;
  role: Role;
}
