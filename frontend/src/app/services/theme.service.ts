import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'ds-theme';
  theme = signal<Theme>(this.getInitialTheme());

  constructor() { this.apply(this.theme()); }


  private getInitialTheme(): Theme {
    const saved = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private apply(theme: Theme): void {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }
  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';

    document.documentElement.classList.add('theme-transition');
    setTimeout(() => document.documentElement.classList.remove('theme-transition'), 350);

    this.theme.set(next);
    this.apply(next);
    localStorage.setItem(this.STORAGE_KEY, next);
  }
}
