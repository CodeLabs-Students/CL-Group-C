import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, createUserWithEmailAndPassword, updateProfile} from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

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

  constructor(
    private router: Router,
    private auth: Auth,
    private firestore: Firestore
  ) {}

  async handleCreateAccount(): Promise<void> {
    const usernameVal = this.username();
    const emailVal = this.email();
    const passwordVal = this.password();
    const confirmPasswordVal = this.confirmPassword();

    if (!usernameVal || !emailVal || !passwordVal || passwordVal !== confirmPasswordVal) {
      alert('Please fill all fields and make sure passwords match.');
      return;
    }

    try {
      // 1) Create the user
      const cred = await createUserWithEmailAndPassword(this.auth, emailVal, passwordVal );

      // 2) Stamp on their displayName
      await updateProfile(cred.user, { displayName: usernameVal });

      // 3) Persist extra profile data
      const ref = doc(this.firestore, `users/${cred.user.uid}`);
      await setDoc(ref, {
        uid:       cred.user.uid,
        username:  usernameVal,
        email:     emailVal,
        createdAt: new Date()
      });

      alert('Account created! Redirecting to login…');
      this.router.navigate(['/login']);

    } catch (err: any) {
      // catches “email-already-in-use”, weak passwords, etc.
      alert(`Error: ${err.message}`);
    }
  }
}
