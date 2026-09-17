import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {IconComponent} from '../components/icon/icon.component';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrls:  ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  token = '';
  newPassword = '';
  confirmPassword = '';
  showPassword = false;
  loading = false;
  done = false;
  erro = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    if (!this.token) {
      this.erro = 'Lien de réinitialisation invalide ou manquant';
    }
  }

  valider(): void {
    this.erro = '';
    if (this.newPassword.length < 6) {
      this.erro = 'Le mot de passe doit contenir au moins 6 caractères';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.erro = 'Les mots de passe ne correspondent pas';
      return;
    }
    this.loading = true;
    this.auth.resetPassword(this.token, this.newPassword).subscribe({
      next: () => {
        this.loading = false;
        this.done = true;
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (e) => {
        this.loading = false;
        this.erro = e?.error?.message || 'Erreur lors de la réinitialisation';
      }
    });
  }
}
