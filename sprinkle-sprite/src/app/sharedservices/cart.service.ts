import { computed, Injectable, signal } from '@angular/core';
import { Flavor } from '../backend/inventory.service';

//-----Interface Area-----//

// Represents an item stored in the user's cart.
// Extends Flavor and includes quantity tracking.
export interface CartItem extends Flavor {
  count: number; // Total quantity of this item in the cart
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //-----Cart State-----//

  // Reactive list of all items currently in the cart.
  cartItems = signal<CartItem[]>([]);


  //-----Computed Totals-----//

  // Calculates the combined cost of all items (pre-tax).
  subTotal = computed(() => {
    return this.cartItems().reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  });

  // Calculates the total quantity of all items in the cart.
  totalCount = computed(() => {
    return this.cartItems().reduce((total, item) => {
      return total + item.count;
    }, 0);
  });

  // Applies our local sales tax (8.475%) to the subtotal.
  tax = computed(() => {
    return this.subTotal() * 0.08475;
  });

  // Combined subtotal + tax (final total shown at checkout).
  total = computed(() => {
    return this.subTotal() + this.tax();
  });


  //-----Cart Modification Logic-----//

  // Adds an item to the cart.
  // If the item already exists, increments its count.
  addToCart(item: Flavor): void {
    this.cartItems.update(items => {
      const index = items.findIndex(i => i.name === item.name);
      if (index !== -1) {
        const updated = [...items];
        updated[index].count += 1;
        return updated;
      } else {
        return [...items, { ...item, count: 1 }];
      }
    });
  }

  // Removes a specific item from the cart entirely.
  removeFromCart(item: Flavor): void {
    this.cartItems.update(items =>
      items.filter(i => i.name !== item.name)
    );
  }

  // Updates the quantity of an item already in the cart.
  // Replaces the existing item with a new version that has the new count.
  updateItemCount(item: Flavor, count: number): void {
    this.cartItems.update(items => {
      const index = items.findIndex(i => i.name === item.name);
      if (index !== -1) {
        const updatedItem = { ...items[index], count };
        return [
          ...items.slice(0, index),
          updatedItem,
          ...items.slice(index + 1)
        ];
      }
      return items;
    });
  }
  clearCart(): void {
  this.cartItems.set([]);
}


}



