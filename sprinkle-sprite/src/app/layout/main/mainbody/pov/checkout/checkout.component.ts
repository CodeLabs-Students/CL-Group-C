//----- Angular Core & Common Utilities -----//

import { Component, inject,effect, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

//----- App Services -----//

import {
  Flavor,
  InventoryService,
} from '../../../../../backend/inventory.service';
import {
  CardDataService,
  Card,
} from '../../../../../sharedservices/card-data.service';
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

  private readonly inventoryService = inject(InventoryService); // Pulls in full flavor data
  readonly cardDataService = inject(CardDataService); // Provides seasonal card mapping and UI state
  readonly cardService = this.cardDataService; // Alias used by the template
  readonly cartService = inject(CartService); // Manages live cart signal state
  readonly cartActions = inject(CartActionsService); // Handles cart logic on Add to Cart button

  //----- Computed Totals (Signals) -----//

  readonly subTotal = this.cartService.subTotal; // Cart subtotal before tax
  readonly totalCount = this.cartService.totalCount; // Total item count in cart
  readonly tax = this.cartService.tax; // Tax computed on subtotal
  readonly total = this.cartService.total; // Total including tax
  readonly cartItems = this.cartService.cartItems; // Signal list of items in the cart

  //----- Seasonal Items (Filtered) -----//

  seasonalItems: Card[] = []; // Holds only "Seasonal" rarity cards

  //----- UI State Flags -----//

  thankYouShown = signal(false); // Triggers thank-you confirmation after checkout

  //----- Reactive Cart Watcher -----//

// Runs once when the component is created.
// - Sets up a reactive effect that listens to signal changes
// - Tracks the total cart count (totalCount())
// - Tracks whether the thank-you screen is currently showing (thankYouShown())
// - If a new item is added after checkout, it auto-hides the thank-you screen
constructor() {
  effect(() => {
    const count = this.totalCount();         // Reactive signal for how many items are in the cart
    const wasShown = this.thankYouShown();   // Reactive signal for whether thank-you screen is showing

    // If thank-you was active and a new item was added, restore the summary view
    if (wasShown && count > 0) {
      this.thankYouShown.set(false);
    }
  });
}


  //----- Lifecycle Hook -----//

  // Runs when the component first loads.
  // - Checks if cards have already been initialized
  // - If not, fetches flavor data from the backend
  // - Maps that data into card objects
  // - Then filters out only seasonal cards for display
  ngOnInit(): void {
    // If this is the first time loading, fetch from backend
    if (this.cardDataService.cards.length === 0) {
      this.inventoryService.getFlavors().subscribe((flavors) => {
        this.cardDataService.setFromFlavors(flavors); // Convert raw flavors into card objects
        this.filterSeasonal(); // Only keep cards marked as "Seasonal"
      });
    } else {
      // If data already exists, just filter it
      this.filterSeasonal();
    }
  }

  //----- Seasonal Filter Logic -----//

  // Filters mapped cards down to those marked "Seasonal"
  private filterSeasonal(): void {
    this.seasonalItems = this.cardDataService.cards.filter(
      (card) => card.rarity === 'Seasonal'
    );
  }

  //----- Cart Editing (Prompt UI) -----//

  // Opens a manual prompt so the user can change how many of this item they want.
  // This is a quick and dirty way to adjust quantities directly in the cart view.
  // - If user enters 0, the item will be removed.
  // - If they enter too many, we cap it at the stock limit (defaults to 99).
  // - If the stock cap is hit, we show an alert letting them know.
  //
  // NOTE: This will eventually be replaced by a proper modal or input field.
  editItem(item: CartItem): void {
    // Show a prompt pre-filled with the current count
    const newCount = Number(
      prompt(`Edit quantity for "${item.name}":`, item.count.toString())
    );

    // Only continue if the user entered a real number (and not a letter or blank)
    if (!isNaN(newCount) && newCount >= 0) {
      // Limit the quantity to whatever stock is available (or 99 if not provided)
      const limitedCount = Math.min(newCount, item.stock ?? 99);

      // Apply the new (or capped) quantity to the cart
      this.cartService.updateItemCount(item, limitedCount);
    }

    // If the user tried to go over the limit, give them a warning
    if (newCount > (item.stock ?? 99)) {
      alert(`Only ${item.stock} in stock. Quantity set to ${item.stock}.`);
    }
  }

  //----- Final Checkout Flow -----//

  // Clears the cart and resets all local card preview counts.
  // Triggers thank-you confirmation and hides the summary section.
  checkoutNow(): void {
    if (this.totalCount() === 0) return;

    this.cartService.clearCart(); // Wipes cart state
    this.cardDataService.resetCardCounts(); // Resets preview counts
    this.thankYouShown.set(true); // Triggers thank-you message
  }
}
