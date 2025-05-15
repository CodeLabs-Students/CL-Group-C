import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _token = signal<string | null>(localStorage.getItem('token'));
  private _username = signal<string | null>(localStorage.getItem('username'));

  readonly isLoggedIn = computed(() => this._token() !== null);
  readonly username = computed(() => this._username());

  private router = inject(Router);

  login(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.username === username);

    if (!foundUser) {
      alert('User not found');
      return false;
    }

    if (foundUser.password !== password) {
      alert('Password incorrect');
      return false;
    }

    const token = 'sprinkle123token';
    this._token.set(token);
    this._username.set(username);
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);

    this.router.navigate(['/home']);
    return true;
  }


  logout(): void {
    this._token.set(null);
    this._username.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    this.router.navigate(['/login']);
  }
}
