//----- Angular Core & Common Utilities -----//

import { Component, inject, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

//----- App Services -----//

import { Flavor, InventoryService } from '../../../../../backend/inventory.service';
import { CardDataService, Card } from '../../../../../sharedservices/card-data.service';
import { CartService } from '../../../../../sharedservices/cart.service';
import type { CartItem } from '../../../../../sharedservices/cart.service';
import { CartActionsService } from '../../../../../sharedservices/cart-actions.service';

//----- Checkout Component -----//

@Component({
  selector: 'app-checkout', // Component selector used in templates
  standalone: true, // Standalone component (no NgModule needed)
  imports: [CommonModule, CurrencyPipe], // Common directives and currency formatting
  templateUrl: './checkout.component.html', // HTML template path
  styleUrls: [
    // Multiple CSS files for layout and styling
    './checkout.component.css',
    './styles/checkout-layout.css',
    './styles/thank-you.css',
    './styles/checkout-cards.css',
    './styles/checkout-card-expanded.css',
    './styles/summary-box.css',
    './styles/checkout-media.css',
    './styles/checkout-summary-items.css',
  ],
})
export class CheckoutComponent {
  //----- Service Injection -----//

  // Inject backend and shared card services
  private readonly inventoryService = inject(InventoryService);
  readonly cardDataService = inject(CardDataService);
  readonly cardService = this.cardDataService; // Alias for template access
  readonly cartService = inject(CartService); // Cart service for checkout operations
  readonly cartActions = inject(CartActionsService);

  //----- Computed Totals -----//

  // Tracks total price and item count using Angular signals
  readonly subTotal = this.cartService.subTotal;
  readonly totalCount = this.cartService.totalCount;
  readonly tax = this.cartService.tax;
  readonly total = this.cartService.total;
  readonly cartItems = this.cartService.cartItems; // Cart items for display

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


  //----- Cart Item Editing -----//

  //Opens a prompt to let the user edit the quantity of a cart item.
  //- If user enters 0, the item will be removed.
  //- Invalid entries are ignored.

  editItem(item: CartItem): void {
    const newCount = Number(
      prompt(`Edit quantity for "${item.name}":`, item.count.toString())
    );
    if (!isNaN(newCount) && newCount >= 0) {
      const limitedCount = Math.min(newCount, item.stock ?? 99);
      this.cartService.updateItemCount(item, limitedCount);
    }
    if (newCount > (item.stock ?? 99)) {
  alert(`Only ${item.stock} in stock. Quantity set to ${item.stock}.`);
}

  }

  //-----Final Checkout Logic-----//


    thankYouShown = false;

  // Clears the cart and resets all preview cards
  checkoutNow(): void {
    if (this.totalCount() === 0) return;


    this.cartService.clearCart();
    this.cardDataService.resetCardCounts();

    this.thankYouShown = true;
  }
}
