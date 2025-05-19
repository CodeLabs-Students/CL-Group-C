import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

//-----Stateful Create User Component-----//

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent {
  //-----State section-----//

  // Tracks each input field for form binding

  // Holds the username entered by the user
  username = signal('');

  // Holds the email entered by the user
  email = signal('');

  // Holds the main password input
  password = signal('');

  // Holds the repeated password to confirm it matches
  confirmPassword = signal('');

  constructor(private router: Router) {}

  //-----Account Creation Logic-----//

  // Called when the create account form is submitted
  handleCreateAccount(): void {
    const usernameVal = this.username(); // get username
    const emailVal = this.email(); // get email
    const passwordVal = this.password(); // get password
    const confirmPasswordVal = this.confirmPassword(); // get confirm password

    // Form validation: all fields must be filled and passwords must match
    if (
      !usernameVal ||
      !emailVal ||
      !passwordVal ||
      passwordVal !== confirmPasswordVal
    ) {
      alert('Please fill all fields and make sure passwords match.');
      return;
    }

    //-----Local Storage Logic-----//

    // Retrieve existing users from localStorage (if any)
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check for duplicate username
    const usernameExists = users.some((u: any) => u.username === usernameVal);
    if (usernameExists) {
      alert('Username already taken. Please choose another.');
      return;
    }

    // Create new user object (NOTE: passwords stored in plain text for demo purposes)

    // This object holds the data for a newly registered user.
    // It will be added to the localStorage 'users' array.
    const newUser = {
      username: usernameVal, // The username entered in the form
      email: emailVal, // The email entered in the form
      password: passwordVal, // The password (no encryption - demo only)
    };

    // Add new user to list and store in localStorage

    // Push the new user object into the existing array of users
    users.push(newUser);

    // Convert the updated user array into a JSON string
    // and save it to localStorage under the 'users' key
    localStorage.setItem('users', JSON.stringify(users));

    // Notify user and redirect to login

    // Show a success message to let the user know the account was created
    alert('Account created! Please log in.');

    // Send the user to the login page after account creation
    this.router.navigate(['/login']);
  }
}
