import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  // Public
  { path: 'login',           component: LoginComponent },
  { path: 'signup',          component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password',  component: ResetPasswordComponent },

  // Protégées
  { path: 'dashboard',    component: DashboardComponent,  canActivate: [authGuard] },
  { path: 'categories',   component: CategoriesComponent, canActivate: [authGuard] },
  { path: 'profile',      component: ProfileComponent,    canActivate: [authGuard] },
  { path: 'about',        component: AboutComponent,      canActivate: [authGuard] },

  { path: 'fornecedores',
    loadComponent: () => import('./pages/fornecedores/fornecedores.component').then(m => m.FornecedoresComponent),
    canActivate: [authGuard] },

  { path: 'produtos',
    loadComponent: () => import('./pages/produtos/produtos.component').then(m => m.ProdutosComponent),
    canActivate: [authGuard] },

  { path: 'mouvements',
    loadComponent: () => import('./pages/mouvements/mouvements.component').then(m => m.MouvementsComponent),
    canActivate: [authGuard] },

  { path: 'usuarios',
    loadComponent: () => import('./pages/usuarios/usuarios.component').then(m => m.UsuariosComponent),
    canActivate: [roleGuard('ADMIN')] },

  // Redirections
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];
