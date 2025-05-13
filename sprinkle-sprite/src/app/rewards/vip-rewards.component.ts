import { Component, inject } from '@angular/core';
import { ShopService } from '../sharedservices/shop.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-vip-rewards',
  imports: [CommonModule],
  templateUrl: './vip-rewards.component.html',
  styleUrl: './vip-rewards.component.css'
})
export class VipRewardsComponent {
  private shop = inject(ShopService);
  loyaltyLevels = this.shop.loyaltyLevels;
  rarities = this.shop.sortedRarities;
}
