import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IconComponent],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email = '';
  loading = false;
  sent = false;
  devLink = '';
  erro = '';

  constructor(private auth: AuthService) {}

  envoyer(): void {
    this.erro = '';
    this.loading = true;
    this.auth.forgotPassword(this.email).subscribe({
      next: (res) => {
        this.loading = false;
        this.sent = true;
        this.devLink = res?.devResetLink || '';
      },
      error: (e) => {
        this.loading = false;
        this.erro = e?.error?.message || 'Erreur lors de l\'envoi';
      }
    });
  }
}
