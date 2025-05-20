import { computed, Injectable, signal } from '@angular/core';
import { Flavor } from '../backend/inventory.service';

interface CartItem extends Flavor {
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<CartItem[]>([]); // Holds the items in the cart

subTotal = computed(() => {
    return this.cartItems().reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  });

  totalCount = computed(() => {
    return this.cartItems().reduce((total, item) => {
      return total + item.count;
    }, 0);
  });

  tax = computed(() => {
    return this.subTotal() * 0.08475; // 8.475% Cape Mo tax
  }
  );

  total = computed(() => {
    return this.subTotal() + this.tax();
  }
  );

  // Adds an item to the cart. If the item already exists, increments its count.

  addToCart(item: Flavor): void {
    this.cartItems.update(items => [...items, { ...item, count: 1 }]);
  }
  removeFromCart(item: Flavor): void {
    this.cartItems.update(items => items.filter(i => i.name !== item.name));
  }

  updateItemCount(item: Flavor, count: number): void {
    this.cartItems.update(items => {
      const index = items.findIndex(i => i.name === item.name);
      if (index !== -1) {
        const updatedItem = { ...items[index], count };
        return [...items.slice(0, index), updatedItem, ...items.slice(index + 1)];
      }
      return items;
    });
  }

}

//nonsense
