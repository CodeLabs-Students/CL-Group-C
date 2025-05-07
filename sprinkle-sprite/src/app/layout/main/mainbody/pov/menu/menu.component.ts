import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import menuData from 'src/app/data/pixel_creamery_firebase_export.json';

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

export class MenuComponent {

  cards: Card[] = [];

  currentPage = 1;
  cardsPerPage = 8;

  ngOnInit() {
    fetch('assets/data/pixel_creamery_firebase_export.json')
      .then(res => res.json())
      .then(data => {
        const rawFlavors = data.ice_cream_flavors;

        this.cards = Object.entries(rawFlavors).map(([id, flavor]: [string, any]) => ({
          id: Number(id),
          title: flavor.name,
          description: flavor.description,
          price: flavor.price,
          rarity: flavor.rarity,
          vip: "vip_Icon",
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
