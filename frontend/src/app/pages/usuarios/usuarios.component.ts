import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Role, Usuario } from '../../models/usuario.model';
import { IconComponent } from '../../components/icon/icon.component';
import { AuthService } from '../../services/auth.service';

interface NouvelUtilisateur {
  username: string;
  password: string;
  nome: string;
  email: string;
  role: Role;
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']

})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  roles: Role[] = ['ADMIN', 'GERANT', 'MAGASINIER', 'VENDEUR', 'ACHETEUR', 'COMPTABLE', 'OBSERVATEUR'];

  roleIcons: Record<Role, string> = {
    ADMIN:       'crown',
    GERANT:      'briefcase',
    MAGASINIER:  'package',
    VENDEUR:     'cart',
    ACHETEUR:    'shoppingBag',
    COMPTABLE:   'chart',
    OBSERVATEUR: 'eye'
  };

  roleColors: Record<Role, string> = {
    ADMIN:       '#dc2626',
    GERANT:      '#2563eb',
    MAGASINIER:  '#d97706',
    VENDEUR:     '#16a34a',
    ACHETEUR:    '#4f46e5',
    COMPTABLE:   '#9333ea',
    OBSERVATEUR: '#64748b'
  };

  showForm = false;
  loading = false;
  erro = '';
  success = '';

  novo: NouvelUtilisateur = {
    username: '',
    password: '',
    nome: '',
    email: '',
    role: 'OBSERVATEUR'
  };

  showPassword = false;

  constructor(private http: HttpClient, public auth: AuthService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.erro = '';
    this.http.get<Usuario[]>('/api/usuarios').subscribe({
      next: d => this.usuarios = d,
      error: e => this.erro = e?.error?.message || 'Erreur lors du chargement'
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.resetForm();
  }

  resetForm(): void {
    this.novo = { username: '', password: '', nome: '', email: '', role: 'OBSERVATEUR' };
    this.erro = '';
    this.success = '';
    this.showPassword = false;
  }

  creer(): void {
    this.erro = '';
    this.success = '';

    if (!this.novo.username.trim() || this.novo.username.length < 3) {
      this.erro = 'Nom d\'utilisateur requis (3 caractères minimum)';
      return;
    }
    if (!this.novo.password || this.novo.password.length < 6) {
      this.erro = 'Mot de passe requis (6 caractères minimum)';
      return;
    }
    if (!this.novo.nome.trim()) {
      this.erro = 'Nom complet requis';
      return;
    }
    if (!this.novo.email.trim()) {
      this.erro = 'Email requis';
      return;
    }

    this.loading = true;
    this.http.post<Usuario>('/api/auth/register', this.novo).subscribe({
      next: () => {
        this.loading = false;
        this.success = `Utilisateur « ${this.novo.username} » créé avec succès`;
        this.resetForm();
        this.showForm = false;
        this.carregar();
      },
      error: (e) => {
        this.loading = false;
        this.erro = e?.error?.message || 'Erreur lors de la création';
      }
    });
  }

  toggleActif(u: Usuario): void {
    if (!u.id) return;
    this.http.patch(`/api/usuarios/${u.id}/actif`, {}).subscribe({
      next: () => this.carregar(),
      error: (e) => this.erro = e?.error?.message || 'Erreur'
    });
  }

  excluir(u: Usuario): void {
    if (!u.id) return;
    if (u.username === this.auth.currentUser()?.username) {
      this.erro = 'Vous ne pouvez pas supprimer votre propre compte';
      return;
    }
    if (confirm(`Exclure définitivement l'utilisateur « ${u.username} » ?`)) {
      this.http.delete(`/api/usuarios/${u.id}`).subscribe({
        next: () => this.carregar(),
        error: (e) => this.erro = e?.error?.message || 'Erreur lors de la suppression'
      });
    }
  }

  getRoleIcon(role: Role): string { return this.roleIcons[role]; }
  getRoleColor(role: Role): string { return this.roleColors[role]; }

  get actifs(): number { return this.usuarios.filter(u => u.actif).length; }
  get inactifs(): number { return this.usuarios.filter(u => !u.actif).length; }
  countByRole(role: Role): number { return this.usuarios.filter(u => u.role === role).length; }
}
