import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IconComponent } from '../../components/icon/icon.component';
import { Role } from '../../models/usuario.model';

interface ProfilDemo {
  label: string;
  user: string;
  pass: string;
  icon: string;
  role: Role;
  color: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  showPassword = false;
  erro = '';
  loading = false;

  profils: ProfilDemo[] = [
    { label: 'Administrateur', user: 'admin',       pass: 'admin123',       icon: 'crown',       role: 'ADMIN',       color: '#dc2626' },
    { label: 'Gérant',         user: 'gerant',      pass: 'gerant123',      icon: 'briefcase',   role: 'GERANT',      color: '#2563eb' },
    { label: 'Magasinier',     user: 'magasinier',  pass: 'magasin123',     icon: 'package',     role: 'MAGASINIER',  color: '#d97706' },
    { label: 'Vendeur',        user: 'vendeur',     pass: 'vendeur123',     icon: 'cart',        role: 'VENDEUR',     color: '#16a34a' },
    { label: 'Acheteur',       user: 'acheteur',    pass: 'acheteur123',    icon: 'shoppingBag', role: 'ACHETEUR',    color: '#4f46e5' },
    { label: 'Comptable',      user: 'comptable',   pass: 'comptable123',   icon: 'chart',       role: 'COMPTABLE',   color: '#9333ea' },
    { label: 'Observateur',    user: 'observateur', pass: 'observateur123', icon: 'eye',         role: 'OBSERVATEUR', color: '#64748b' }
  ];

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    this.erro = '';
    this.loading = true;
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: () => { this.loading = false; this.router.navigate(['/dashboard']); },
      error: () => { this.loading = false; this.erro = 'Identifiants incorrects'; }
    });
  }

  remplir(user: string, pass: string): void {
    this.username = user;
    this.password = pass;
    this.erro = '';
  }
}
