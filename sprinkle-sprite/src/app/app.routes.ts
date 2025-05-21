import { Routes } from '@angular/router';

//-----Eager Component Imports-----//

import { MainbodyComponent } from './layout/main/mainbody/mainbody.component';
import { HomeComponent } from './layout/main/mainbody/pov/home/home.component';
import { MenuComponent } from './layout/main/mainbody/pov/menu/menu.component';
import { CheckoutComponent } from './layout/main/mainbody/pov/checkout/checkout.component';

//-----Route Configuration-----//

// Defines all application routes, including eager and lazy-loaded views.
// Eager views include Home, Menu, and Checkout for faster user experience.
// All other components are lazy-loaded to reduce initial bundle size.

export const routes: Routes = [

  //-----Main Layout Container-----//

  {
    path: '',
    component: MainbodyComponent,
    children: [

      // Home view (default route and /home path)
      { path: '', component: HomeComponent },              // '/' → Default landing page
      { path: 'home', component: HomeComponent },          // '/home'

      // Menu view (eager-loaded to display available flavors quickly)
      { path: 'menu', component: MenuComponent },          // '/menu'

      // Checkout view (eager-loaded to speed up order confirmation)
      { path: 'checkout', component: CheckoutComponent },  // '/checkout'

      // Account view (lazy-loaded; not mission-critical at startup)
      {
        path: 'account',
        loadComponent: () =>
          import('./layout/main/mainbody/pov/account/account.component').then(
            (m) => m.AccountComponent
          ),
      },
    ],
  },

  //-----Standalone Lazy-Loaded Views (Outside Main Layout)-----//

  // Login screen (accessed before entering app)
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },

  // Create Account screen (initial registration)
  {
    path: 'create-account',
    loadComponent: () =>
      import('./create-user/create-user.component').then((m) => m.CreateUserComponent),
  },

  // VIP Rewards page (optional rewards view)
  {
    path: 'vip-rewards',
    loadComponent: () =>
      import('./rewards/vip-rewards.component').then((m) => m.VipRewardsComponent),
  },

  // Catch-all route for invalid URLs (404 fallback)
  {
    path: '**',
    loadComponent: () =>
      import('./layout/page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent
      ),
  },
];
