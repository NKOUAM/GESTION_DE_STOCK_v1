import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  template: `
    <div class="about-hero">
      <div class="about-logo">
        <app-icon name="cube" [size]="36" />
      </div>
      <h1>Gestion de Stock</h1>
      <p class="about-lead">
        Application complète de gestion de stock — produits, catégories, fournisseurs et mouvements.
      </p>
    </div>

    <div class="about-grid">
      <div class="feature">
        <app-icon name="cube" [size]="22" />
        <h3>Produits</h3>
        <p>Gérez votre catalogue avec prix, stock, catégorie et fournisseur associés.</p>
      </div>
      <div class="feature">
        <app-icon name="tag" [size]="22" />
        <h3>Catégories</h3>
        <p>Organisez vos produits par catégories pour un suivi plus clair.</p>
      </div>
      <div class="feature">
        <app-icon name="building" [size]="22" />
        <h3>Fournisseurs</h3>
        <p>Centralisez les coordonnées de vos fournisseurs et leurs produits.</p>
      </div>
      <div class="feature">
        <app-icon name="exchange" [size]="22" />
        <h3>Mouvements</h3>
        <p>Enregistrez les entrées et sorties de stock avec vérification automatique.</p>
      </div>
      <div class="feature">
        <app-icon name="chart" [size]="22" />
        <h3>Tableau de bord</h3>
        <p>Visualisez vos totaux en un coup d'œil : produits, catégories, stock.</p>
      </div>
      <div class="feature">
        <app-icon name="pin" [size]="22" />
        <h3>Géolocalisation</h3>
        <p>Détectez automatiquement votre position et la météo locale en temps réel.</p>
      </div>
      <div class="feature">
        <app-icon name="moon" [size]="22" />
        <h3>Mode sombre</h3>
        <p>Basculez entre thème clair et sombre selon vos préférences.</p>
      </div>
      <div class="feature">
        <app-icon name="cog" [size]="22" />
        <h3>API REST</h3>
        <p>Backend Spring Boot, base MySQL, DTO, validation et gestion d'erreurs.</p>
      </div>
    </div>

    <div class="about-cta">
      <a routerLink="/dashboard" class="btn-primary">
        <app-icon name="dashboard" [size]="18" />
        Aller au tableau de bord
      </a>
      <a routerLink="/login" class="btn-secondary">
        <app-icon name="login" [size]="18" />
        Se connecter
      </a>
    </div>
  `,
  styles: [`
    .about-hero { text-align: center; padding: 20px 0 40px; }
    .about-logo {
      width: 80px; height: 80px; border-radius: 20px;
      background: var(--ds-gradient);
      display: flex; align-items: center; justify-content: center;
      color: #fff; margin: 0 auto 20px;
      box-shadow: 0 12px 32px rgba(77,107,254,0.28);
    }
    .about-hero h1 { margin: 0 0 12px 0; font-size: 32px; letter-spacing: -0.5px; }
    .about-lead {
      margin: 0 auto; max-width: 560px;
      color: var(--ds-text-muted); font-size: 16px;
    }
    .about-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    .feature {
      background: var(--ds-card);
      border: 1px solid var(--ds-border);
      border-radius: var(--ds-radius);
      padding: 24px;
      box-shadow: var(--ds-shadow);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .feature:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 28px rgba(77,107,254,0.12);
    }
    .feature app-icon { color: var(--ds-primary); }
    .feature h3 { margin: 12px 0 8px; font-size: 16px; }
    .feature p { margin: 0; color: var(--ds-text-muted); font-size: 14px; line-height: 1.5; }

    .about-cta {
      display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;
      padding: 24px;
    }
    .btn-primary, .btn-secondary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 22px; border-radius: 10px;
      text-decoration: none; font-weight: 600; font-size: 14px;
      transition: transform 0.1s;
    }
    .btn-primary {
      background: var(--ds-gradient); color: #fff;
      box-shadow: 0 4px 16px rgba(77,107,254,0.28);
    }
    .btn-secondary {
      background: #F3F4F6; color: var(--ds-text);
    }
    html.dark .btn-secondary { background: #334155; color: #F1F5F9; }
    .btn-primary:hover, .btn-secondary:hover { transform: translateY(-1px); }
  `]
})
export class AboutComponent {}
