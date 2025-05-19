//----- Angular Core Imports -----//

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//----- App Services -----//

import { ShopService } from '../sharedservices/shop.service';

//----- VIP Rewards Component -----//

@Component({
  selector: 'app-vip-rewards',                       // Component selector used in HTML
  imports: [CommonModule, RouterModule],            // Brings in common directives and router support
  templateUrl: './vip-rewards.component.html',      // Path to the HTML file
  styleUrl: './vip-rewards.component.css'           // Path to the CSS file
})
export class VipRewardsComponent {

  //----- State Injection -----//

  // Brings in ShopService so we can access rarity and loyalty data
  private shop = inject(ShopService);

  // Gets the sorted loyalty levels from the shop
  // Used to display user reward tiers
  loyaltyLevels = this.shop.sortedLoyaltyLevels;

  // Gets the sorted rarity list from the shop
  // Used to display XP values or rarity breakdowns
  rarities = this.shop.sortedRarities;
}
