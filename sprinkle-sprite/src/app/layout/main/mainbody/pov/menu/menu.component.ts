import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

  export interface Card {
    id: number;
    title: string;
    description: string;
  }

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})

export class MenuComponent {
 

  cards: Card[] = [];
  currentPage = 1;
  cardsPerPage = 6;

  get paginatedCards() {
    const start = (this.currentPage - 1) * this.cardsPerPage;
    return this.cards.slice(start, start + this.cardsPerPage);
  }

  ngOnInit() {
    this.cards = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Card ${i + 1}`,
      description: `Description fror card ${i + 1}`,
    }));
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

  count: number = 0;

  increase() {
    this.count++; 
  }

  decrease() {
    this.count--;
  }

}
