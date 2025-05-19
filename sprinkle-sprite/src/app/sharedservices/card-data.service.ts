import { Injectable } from '@angular/core';
import { Flavor, InventoryService } from '../backend/inventory.service';
import { signal } from '@angular/core';

//-----Interface area-----//


 //Represents a single ice cream flavor card used in the menu,
 //checkout, and cart systems. Each card is initialized from
 //a Flavor object and can track quantity and UI expansion state.

export interface Card {
  id: number;             // Unique ID assigned during mapping
  title: string;          // Flavor name (from InventoryService)
  description: string;    // Flavor description
  price: number;          // Cost of the item
  rarity: string;         // Rarity label (linked to XP value)
  count: number;          // Quantity selected by the user
  expanded?: boolean;     // UI flag for expanded card view
}
@Injectable({
  providedIn: 'root',
})
export class CardDataService {

  //-----State section-----//


  // Holds the shared list of all mapped cards used by the app.
  // Populated once using setFromFlavors() and accessed by all POVs.
  cards: Card[] = [];
  totalPrice = signal<number>(0); // Total price of all selected items
  totalCount = signal<number>(0); // Total count of all selected items


  //-----Data Mapping-----//

  //Converts the raw Flavor data from InventoryService into Card objects
  //used throughout the app. This method is typically called once on init
  //to populate the menu and checkout views with a shared card list.

  // Each card is initialized with:
  //- a unique ID
  //- mapped flavor info (name, description, price, rarity)
  //- count set to 0
  //- expanded state set to false
  setFromFlavors(flavors: Flavor[]): void {
    this.cards = flavors.map((flavor, index) => ({
      id: index + 1,
      title: flavor.name,
      description: flavor.description,
      price: flavor.price,
      rarity: flavor.rarity,
      count: 0,
      expanded: false,
    }));
  }

  //-----Count Logic Section-----//

  //button logic to increase count for card
  increase(card: Card): void {
    card.count++;
    this.totalPrice.update(tp => tp + card.price); // Increment total price
    this.totalCount.update(tc => tc + 1); // Increment total count
    console.log(this.totalPrice(), this.totalCount());
    console.log('Total Count:', this.totalCount());
  }
  //button logic to decrease count for card
  decrease(card: Card): void {
    if (card.count > 0) {
      card.count--;
       this.totalPrice.update(tp => tp - card.price); // Decrement total price
      this.totalCount.update(tc => tc - 1); // Decrement total count
      console.log('Total Count:', this.totalCount());
      console.log('Total Price:', this.totalPrice());
    }
  }

  //-----Card View Toggle Logic-----//


  //Logic to switch card view from default to expanded
  toggleCard(card: Card): void {
    const isAlreadyExpanded = card.expanded;

    // Collapse all cards
    this.cards.forEach(container => (container.expanded = false));

    // Expand the clicked one (if not already)
    if (!isAlreadyExpanded) {
      card.expanded = true;
    }
  }
}
