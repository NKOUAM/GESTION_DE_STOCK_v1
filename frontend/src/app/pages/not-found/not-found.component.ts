import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  template: `
    <div class="nf-wrap">
      <div class="nf-card">
        <div class="nf-icon">
          <app-icon name="warning" [size]="40" />
        </div>
        <h1>404</h1>
        <p class="nf-sub">Page introuvable</p>
        <p class="nf-text">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div class="nf-actions">
          <a routerLink="/dashboard" class="btn-primary">
            <app-icon name="home" [size]="18" />
            Retour à l'accueil
          </a>
          <a routerLink="/about" class="btn-secondary">
            <app-icon name="info" [size]="18" />
            À propos
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .nf-wrap {
      min-height: calc(100vh - 70px);
      display: flex; align-items: center; justify-content: center;
      padding: 40px 20px;
    }
    .nf-card {
      text-align: center;
      background: var(--ds-card);
      border: 1px solid var(--ds-border);
      border-radius: 16px;
      box-shadow: 0 12px 40px rgba(77,107,254,0.10);
      padding: 48px 40px;
      max-width: 480px;
    }
    .nf-icon {
      width: 80px; height: 80px; border-radius: 20px;
      background: #FEF2F2; color: #EF4444;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 20px;
    }
    html.dark .nf-icon { background: #7F1D1D; color: #FCA5A5; }
    .nf-card h1 {
      margin: 0; font-size: 64px; font-weight: 800; letter-spacing: -2px;
      background: var(--ds-gradient);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .nf-sub { margin: 6px 0 16px; font-size: 18px; font-weight: 600; }
    .nf-text { margin: 0 0 28px; color: var(--ds-text-muted); }
    .nf-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
    .btn-primary, .btn-secondary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 18px; border-radius: 10px;
      text-decoration: none; font-weight: 600; font-size: 14px;
    }
    .btn-primary { background: var(--ds-gradient); color: #fff; }
    .btn-secondary { background: #F3F4F6; color: var(--ds-text); }
    html.dark .btn-secondary { background: #334155; color: #F1F5F9; }
  `]
})
export class NotFoundComponent {}
