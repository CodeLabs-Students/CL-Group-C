import { Routes } from '@angular/router';
import { MainbodyComponent } from './layout/main/mainbody/mainbody.component';
import { HomeComponent } from './layout/main/mainbody/pov/home/home.component';
import { AccountComponent } from './layout/main/mainbody/pov/account/account.component';
import { CheckoutComponent } from './layout/main/mainbody/pov/checkout/checkout.component';
import { MenuComponent } from './layout/main/mainbody/pov/menu/menu.component';

export const routes: Routes = [
  {
    path: '',
    component: MainbodyComponent,
    children: [
      { path: '', component: HomeComponent }, // '/'
      { path: 'home', component: HomeComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'account', component: AccountComponent },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
];
