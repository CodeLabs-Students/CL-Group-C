import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})

export class CreateUserComponent {
  username = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');

  constructor(private router: Router) {}

  handleCreateAccount(): void {
    const usernameVal = this.username();
    const emailVal = this.email();
    const passwordVal = this.password();
    const confirmPasswordVal = this.confirmPassword();

    if (!usernameVal || !emailVal || !passwordVal || passwordVal !== confirmPasswordVal) {
      alert('Please fill all fields and make sure passwords match.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const usernameExists = users.some((u: any) => u.username === usernameVal);
    if (usernameExists) {
      alert('Username already taken. Please choose another.');
      return;
    }

    const newUser = {
      username: usernameVal,
      email: emailVal,
      password: passwordVal, // NOTE: plaintext for testing only
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Account created! Please log in.');
    this.router.navigate(['/login']);
  }
}
