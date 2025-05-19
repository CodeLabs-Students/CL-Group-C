//----- Angular Core & Routing -----//

import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';

//----- Auth Service -----//

import { AuthService } from '../../auth/auth.service';

//----- Header Component -----//

@Component({
  selector: 'app-header',                            // Component selector used in layout
  imports: [RouterLink, RouterModule],               // Enables routing and clickable nav links
  templateUrl: './header.component.html',            // HTML template path
  styleUrl: './header.component.css'                 // Styles specific to the header
})
export class HeaderComponent {

  //----- Injected Services -----//

  auth = inject(AuthService);                        // Provides login/logout state
  router = inject(Router);                           // Used for navigation

  //----- Login / Logout Handler -----//

  // When the auth button is clicked:
  // - If the user is logged in → log them out
  // - If the user is not logged in → navigate to login page
  handleAuthClick() {
    if (this.auth.isLoggedIn()) {
      this.auth.logout();
    } else {
      this.router.navigate(['/login']);
    }
  }
}
