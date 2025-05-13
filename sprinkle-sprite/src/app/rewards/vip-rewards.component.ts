import { Component, inject } from '@angular/core';
import { ShopService } from '../sharedservices/shop.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-vip-rewards',
  imports: [CommonModule, RouterModule],
  templateUrl: './vip-rewards.component.html',
  styleUrl: './vip-rewards.component.css'
})
export class VipRewardsComponent {
  private shop = inject(ShopService);
  loyaltyLevels = this.shop.loyaltyLevels;
  rarities = this.shop.sortedRarities;
}
