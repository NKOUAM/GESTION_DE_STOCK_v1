import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <button class="theme-btn" (click)="theme.toggle()"
      [attr.aria-label]="theme.theme() === 'dark' ? 'Mode clair' : 'Mode sombre'">
      <app-icon [name]="theme.theme() === 'dark' ? 'sun' : 'moon'" [size]="18" />
    </button>
  `,
  styles: [`
    .theme-btn {
      background: rgba(255,255,255,0.18);
      border: none; color: #fff;
      width: 38px; height: 38px;
      border-radius: 10px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s, transform 0.2s;
    }
    .theme-btn:hover { background: rgba(255,255,255,0.3); transform: scale(1.05); }
  `]
})
export class ThemeToggleComponent {
  constructor(public theme: ThemeService) {}
}
