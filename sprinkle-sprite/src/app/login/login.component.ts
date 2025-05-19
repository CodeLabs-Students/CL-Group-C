//----- Angular Core & Forms -----//

import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//----- Auth Service -----//

import { AuthService } from '../auth/auth.service';

//----- Login Component -----//

@Component({
  selector: 'app-login',                             // Selector used in templates
  imports: [CommonModule, FormsModule, RouterModule], // Required modules for form and routing
  templateUrl: './login.component.html',             // HTML template path
  styleUrl: './login.component.css'                  // Component-specific styles
})
export class LoginComponent {

  //----- Form State -----//

  // Reactive input fields for login form
  username = signal('');  // Tracks the current username input
  password = signal('');  // Tracks the current password input

  //----- Constructor Injection -----//

  // Injects the AuthService to handle login logic
  constructor(private auth: AuthService) {}

  //----- Login Logic -----//

  // Called when user submits the login form
  handleLogin(): void {
    // Try to log in using the current username and password values
    const success = this.auth.login(this.username(), this.password());

    // If login fails, clear the form fields
    if (!success) {
      this.username.set('');
      this.password.set('');
    }
  }
}
