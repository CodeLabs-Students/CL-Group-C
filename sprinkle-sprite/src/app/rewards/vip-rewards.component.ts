import { Component, inject } from '@angular/core';
import { ShopService } from '../sharedservices/shop.service';

@Component({
  selector: 'app-vip-rewards',
  imports: [],
  templateUrl: './vip-rewards.component.html',
  styleUrl: './vip-rewards.component.css'
})
export class VipRewardsComponent {
  private shop = inject(ShopService);
  loyaltyLevels = this.shop.loyaltyLevels;
}
