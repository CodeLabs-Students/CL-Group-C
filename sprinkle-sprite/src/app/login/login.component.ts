import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = signal('');
  password = signal('');

  constructor(private auth: AuthService) {}

  handleLogin(): void {
    const success = this.auth.login(this.username(), this.password());

    if (!success) {
      this.username.set('');
      this.password.set('');
    }
}}
