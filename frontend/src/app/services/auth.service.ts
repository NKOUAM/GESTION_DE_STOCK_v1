import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import {LoginRequest, LoginResponse, Role, Usuario} from '../models/usuario.model';

const TOKEN_KEY = 'estoque_token';
const USER_KEY  = 'estoque_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = '/api/auth';
  currentUser = signal<LoginResponse | null>(this.loadUser());

  constructor(private http: HttpClient, private router: Router) {}

  login(req: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.base}/login`, req).pipe(
      tap(res => {
        localStorage.setItem(TOKEN_KEY, res.token);
        localStorage.setItem(USER_KEY, JSON.stringify(res));
        this.currentUser.set(res);
      })
    );
  }

  register(data: Partial<Usuario> & { password: string }): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.base}/register`, data);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.base}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.base}/reset-password`, { token, newPassword });
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.base}/change-password`, { currentPassword, newPassword });
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null { return localStorage.getItem(TOKEN_KEY); }
  isLoggedIn(): boolean { return !!this.getToken(); }
  getRole(): Role | null { return this.currentUser()?.role ?? null; }
  hasRole(...roles: Role[]): boolean {
    const r = this.getRole();
    return r !== null && roles.includes(r);
  }
  isAdmin(): boolean { return this.getRole() === 'ADMIN'; }

  private loadUser(): LoginResponse | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
