import { Injectable, inject } from '@angular/core';
import { CartService } from './cart.service';
import { Card } from './card-data.service';

@Injectable({ providedIn: 'root' })
export class CartActionsService {
  private readonly cartService = inject(CartService);


//-----Cart Action Logic-----//

// Adds the selected card to the cart based on its current count.
// If the count is greater than 0, the item is added one unit at a time.
// After adding, the local preview count is reset to 0.
addCardToCart(card: Card): void {
  if (card.count > 0) {
    for (let i = 0; i < card.count; i++) {
      this.cartService.addToCart(card);
    }
    card.count = 0;
  }
}}
