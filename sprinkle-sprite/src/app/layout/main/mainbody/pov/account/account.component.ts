//----- Angular Core -----//

import { Component } from '@angular/core';
import { Router } from '@angular/router';

//----- Account Component -----//

@Component({
  selector: 'app-account',                          // Component selector used in routes/templates
  imports: [],                                      // No external modules needed for now
  templateUrl: './account.component.html',          // Path to HTML view
  styleUrl: './account.component.css'               // Path to component-specific styles
})
export class AccountComponent {

  //----- Router Injection -----//

  // Injects Angular Router for page navigation
  constructor(private router: Router) {}

  //----- Navigation Methods -----//

  // Navigate to the login page
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Navigate to the VIP rewards page
  goToVip() {
    this.router.navigate(['/vip-rewards']);
  }
}
