import { Routes } from '@angular/router';

//-----Component Imports-----//

import { MainbodyComponent } from './layout/main/mainbody/mainbody.component';
import { HomeComponent } from './layout/main/mainbody/pov/home/home.component';
import { AccountComponent } from './layout/main/mainbody/pov/account/account.component';
import { CheckoutComponent } from './layout/main/mainbody/pov/checkout/checkout.component';
import { MenuComponent } from './layout/main/mainbody/pov/menu/menu.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';

//-----Route Configuration-----//

// Defines all the navigation routes for the app.
// Each path corresponds to a different view or page component.
export const routes: Routes = [

  // Root layout that wraps all main views (home, menu, etc.)
  {
    path: '',
    component: MainbodyComponent,
    children: [
      { path: '', component: HomeComponent },             // '/' → Default route
      { path: 'home', component: HomeComponent },         // '/home'
      { path: 'menu', component: MenuComponent },         // '/menu'
      { path: 'checkout', component: CheckoutComponent }, // '/checkout'
      { path: 'account', component: AccountComponent },   // '/account'
    ],
  },

  // Lazy-loaded routes for standalone views

  // Login page (outside main layout)
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },

  // Create Account page (outside main layout)
  {
    path: 'create-account',
    loadComponent: () =>
      import('./create-user/create-user.component').then((m) => m.CreateUserComponent),
  },

  // VIP Rewards page (outside main layout)
  {
    path: 'vip-rewards',
    loadComponent: () =>
      import('./rewards/vip-rewards.component').then((m) => m.VipRewardsComponent),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
