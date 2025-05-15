import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InventoryService, Flavor } from '../../../../../backend/inventory.service';


  export interface Card {
  id: number;
  title: string;
  description: string;
  price: number;
  rarity: string;
  count: number;
  expanded?: boolean;
  }

@Component({
  selector: 'app-menu',
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})

export class MenuComponent implements OnInit {
  constructor(private inventoryService: InventoryService) {}
  cards: Card[] = [];

  currentPage = 1;
  cardsPerPage = 8;

  ngOnInit(): void {
    this.inventoryService.getFlavors().subscribe((data: Flavor[]) => {
      this.cards = data.map((flavor, index) => ({
        id: index + 1,
        title: flavor.name,
        description: flavor.description,
        price: flavor.price,
        rarity: flavor.rarity,
        count: 0
      }));
    });
  }
  get paginatedCards(): Card[] {
    const start = (this.currentPage - 1) * this.cardsPerPage;
    return this.cards.slice(start, start + this.cardsPerPage);
  }

  nextPage() {
    if (this.currentPage < Math.ceil(this.cards.length / this.cardsPerPage)) {
      this.currentPage++;
    }
  }

  prevPage() {
    if(this.currentPage > 1) {
      this.currentPage--;
    }
  }


  increase(card: Card) {
    card.count++;
  }

  decrease(card: Card) {
    if (card.count > 0) {
      card.count--;
    }
  }
  toggleCard(card: Card) {
    const isAlreadyExpanded = card.expanded;
  // Collapse all cards first
  this.cards.forEach(container => container.expanded = false);

  // Expand the clicked card
  if (!isAlreadyExpanded) {
    card.expanded = true;
  }}
}
