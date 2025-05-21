//----- Angular Core Utilities -----//

import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

//----- Auth Service -----//

@Injectable({ providedIn: 'root' })
export class AuthService {

  //----- State Signals (Token & Username) -----//

  // Holds the login token from localStorage (null if not logged in)
  private _token = signal<string | null>(localStorage.getItem('token'));

  // Holds the current user's username from localStorage
  private _username = signal<string | null>(localStorage.getItem('username'));

  //----- Computed Auth State -----//

  // Returns true if a token is present (user is logged in)
  readonly isLoggedIn = computed(() => this._token() !== null);

  // Returns the current username (or null if not logged in)
  readonly username = computed(() => this._username());

  //----- Router Setup -----//

  private router = inject(Router); // Used to navigate after login/logout

  //----- Login Logic -----//

  // Attempts to log in with a username and password
  // - Loads users from localStorage
  // - Validates username and password
  // - If valid, stores token and redirects to /home
  // - Returns true on success, false on failure
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

    const token = 'sprinkle123token'; // Fake token for demo login
    this._token.set(token);
    this._username.set(username);
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);

    this.router.navigate(['/home']);
    return true;
  }

  //----- Logout Logic -----//

  // Clears auth state and returns user to login page
  logout(): void {
    this._token.set(null);
    this._username.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    this.router.navigate(['/login']);
  }
}
