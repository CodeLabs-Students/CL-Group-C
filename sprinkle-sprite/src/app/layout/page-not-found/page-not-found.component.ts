import { Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {
  private router = inject(Router);
  countdown = signal(20);

  constructor() {
    const intervalId = setInterval(() => {
      this.countdown.update((val) => val - 1);
    }, 1000);

    effect(() => {
      if (this.countdown() <= 0) {
        clearInterval(intervalId);
        this.router.navigate(['/home']);
      }
    });
  }
}
