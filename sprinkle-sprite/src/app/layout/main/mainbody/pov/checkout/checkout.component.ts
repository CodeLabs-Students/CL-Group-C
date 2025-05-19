import { Component, inject, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { InventoryService } from '../../../../../backend/inventory.service';
import { CardDataService, Card } from '../../../../../sharedservices/card-data.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrls: [
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
  // Inject services
  private readonly inventoryService = inject(InventoryService);
  readonly cardDataService = inject(CardDataService);

  // Computed properties
  readonly totalPrice = computed(() => this.cardDataService.totalPrice());
  readonly totalCount = computed(() => this.cardDataService.totalCount());

  // Seasonal items logic
  seasonalItems: Card[] = [];

  ngOnInit(): void {
    if (this.cardDataService.cards.length === 0) {
      this.inventoryService.getFlavors().subscribe((flavors) => {
        this.cardDataService.setFromFlavors(flavors);
        this.filterSeasonal();
      });
    } else {
      this.filterSeasonal();
    }
  }

  private filterSeasonal(): void {
    this.seasonalItems = this.cardDataService.cards.filter(
      (card) => card.rarity === 'Seasonal'
    );
  }
}

