import { Component } from '@angular/core';
import { InventoryService } from '../../../../../backend/inventory.service';
import { CardDataService, Card } from '../../../../../sharedservices/card-data.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
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
  seasonalItems: Card[] = [];

  constructor(
    public cardService: CardDataService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    if (this.cardService.cards.length === 0) {
      this.inventoryService.getFlavors().subscribe((flavors) => {
        this.cardService.setFromFlavors(flavors);
        this.filterSeasonal();
      });
    } else {
      this.filterSeasonal();
    }
  }

  private filterSeasonal(): void {
    this.seasonalItems = this.cardService.cards.filter(
      (card) => card.rarity === 'Seasonal'
    );
  }
}
