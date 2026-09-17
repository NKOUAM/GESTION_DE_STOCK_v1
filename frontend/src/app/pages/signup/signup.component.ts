import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IconComponent } from '../../components/icon/icon.component';
import { Role } from '../../models/usuario.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IconComponent],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username = '';
  password = '';
  confirmPassword = '';
  nome = '';
  email = '';
  role: Role = 'OBSERVATEUR';
  showPassword = false;
  loading = false;
  erro = '';
  success = '';

  roles: { value: Role; label: string; icon: string; color: string }[] = [
    { value: 'MAGASINIER',  label: 'Magasinier',  icon: 'package',     color: '#d97706' },
    { value: 'VENDEUR',     label: 'Vendeur',     icon: 'cart',        color: '#16a34a' },
    { value: 'ACHETEUR',    label: 'Acheteur',    icon: 'shoppingBag', color: '#4f46e5' },
    { value: 'COMPTABLE',   label: 'Comptable',   icon: 'chart',       color: '#9333ea' },
    { value: 'OBSERVATEUR', label: 'Observateur', icon: 'eye',         color: '#64748b' }
  ];

  constructor(private auth: AuthService, private router: Router) {}

  get forceMotDePasse(): 'faible' | 'moyen' | 'fort' {
    const p = this.password;
    if (p.length < 6) return 'faible';
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (score <= 1) return 'faible';
    if (score <= 2) return 'moyen';
    return 'fort';
  }

  inscrire(): void {
    this.erro = '';
    this.success = '';

    if (!this.username.trim() || this.username.length < 3) {
      this.erro = 'Le nom d\'utilisateur doit contenir au moins 3 caractères';
      return;
    }
    if (!this.nome.trim()) {
      this.erro = 'Le nom complet est obligatoire';
      return;
    }
    if (!this.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.erro = 'Adresse email invalide';
      return;
    }
    if (this.password.length < 6) {
      this.erro = 'Le mot de passe doit contenir au moins 6 caractères';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.erro = 'Les mots de passe ne correspondent pas';
      return;
    }

    this.loading = true;
    this.auth.register({
      username: this.username,
      password: this.password,
      nome: this.nome,
      email: this.email,
      role: this.role
    }).subscribe({
      next: () => {
        this.loading = false;
        this.success = 'Compte créé avec succès ! Redirection...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (e) => {
        this.loading = false;
        this.erro = e?.error?.message || 'Erreur lors de la création du compte';
      }
    });
  }
}
