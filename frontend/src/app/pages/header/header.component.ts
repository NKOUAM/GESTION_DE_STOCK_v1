import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { IconComponent } from '../../components/icon/icon.component';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';
import { Role } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, IconComponent, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  roleColors: Record<Role, string> = {
    ADMIN:       '#dc2626',
    GERANT:      '#2563eb',
    MAGASINIER:  '#d97706',
    VENDEUR:     '#16a34a',
    ACHETEUR:    '#4f46e5',
    COMPTABLE:   '#9333ea',
    OBSERVATEUR: '#64748b'
  };

  constructor(public auth: AuthService) {}

  getRoleColor(role: Role): string {
    return this.roleColors[role];
  }
}
