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
    if (
      this.username() &&
      this.email() &&
      this.password() &&
      this.password() === this.confirmPassword()
    ) {
      const user = {
        username: this.username(),
        email: this.email(),
        password: this.password(), // NOTE: insecure for production, fine for testing
      };

      localStorage.setItem('user', JSON.stringify(user));
      alert('Account created! Please log in.');
      this.router.navigate(['/login']);
    } else {
      alert('Please fill all fields and make sure passwords match.');
    }
  }
}
