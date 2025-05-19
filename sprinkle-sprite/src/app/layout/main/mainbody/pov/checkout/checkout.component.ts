//----- Angular Core & Common Utilities -----//

import { Component, inject, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

//----- App Services -----//

import { InventoryService } from '../../../../../backend/inventory.service';
import { CardDataService, Card } from '../../../../../sharedservices/card-data.service';

//----- Checkout Component -----//

@Component({
  selector: 'app-checkout',                         // Component selector used in templates
  standalone: true,                                 // Standalone component (no NgModule needed)
  imports: [CommonModule, CurrencyPipe],            // Common directives and currency formatting
  templateUrl: './checkout.component.html',         // HTML template path
  styleUrls: [                                      // Multiple CSS files for layout and styling
    './checkout.component.css',
    './styles/checkout-layout.css',
    './styles/thank-you.css',
    './styles/checkout-cards.css',
    './styles/checkout-card-expanded.css',
    './styles/summary-box.css',
    './styles/checkout-media.css',
  ]
})
export class CheckoutComponent {

  //----- Service Injection -----//

  // Inject backend and shared card services
  private readonly inventoryService = inject(InventoryService);
  readonly cardDataService = inject(CardDataService);
  readonly cardService = this.cardDataService; // Alias for template access

  //----- Computed Totals -----//

  // Tracks total price and item count using Angular signals
  readonly totalPrice = computed(() => this.cardDataService.totalPrice());
  readonly totalCount = computed(() => this.cardDataService.totalCount());

  //----- Seasonal Items (Filtered) -----//

  // Holds only cards marked as "Seasonal" rarity
  seasonalItems: Card[] = [];

  //----- Lifecycle Hook -----//

  // On component load, populate cards if not already set,
  // then filter the list to only seasonal cards
  ngOnInit(): void {
    if (this.cardDataService.cards.length === 0) {
      this.inventoryService.getFlavors().subscribe((flavors) => {
        this.cardDataService.setFromFlavors(flavors); // Load all cards from inventory
        this.filterSeasonal(); // Filter seasonal cards
      });
    } else {
      this.filterSeasonal();
    }
  }

  //----- Filtering Logic -----//

  // Filters out cards that are not labeled as "Seasonal"
  private filterSeasonal(): void {
    this.seasonalItems = this.cardDataService.cards.filter(
      (card) => card.rarity === 'Seasonal'
    );
  }
}
