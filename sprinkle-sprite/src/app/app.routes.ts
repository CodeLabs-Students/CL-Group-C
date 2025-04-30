import { Routes } from '@angular/router';
import { HomeComponent } from './layout/main/mainbody/pov/home/home.component';
import { AccountComponent } from './layout/main/mainbody/pov/account/account.component';
import { CheckoutComponent } from './layout/main/mainbody/pov/checkout/checkout.component';
import { MenuComponent } from './layout/main/mainbody/pov/menu/menu.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent

  },
  {
    path: 'account',
    component: AccountComponent

  },
  {
    path: 'checkout',
    component: CheckoutComponent

  },
  {
    path: 'menu',
    component: MenuComponent
  }
];
