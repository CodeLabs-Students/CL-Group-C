import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _token = signal<string | null>(localStorage.getItem('token'));
  private _username = signal<string | null>(localStorage.getItem('username'));

  readonly isLoggedIn = computed(() => this._token() !== null);
  readonly username = computed(() => this._username());

  private router = inject(Router);

  login(username: string, password: string): void {
    if (username && password) {
      const fakeToken = 'sprinkle123token';

      this._token.set(fakeToken);
      this._username.set(username);

      localStorage.setItem('token', fakeToken);
      localStorage.setItem('username', username);

      this.router.navigate(['/home']);
    } else {
      alert('Login failed — missing credentials');
    }
  }

  logout(): void {
    this._token.set(null);
    this._username.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    this.router.navigate(['/login']);
  }
}
