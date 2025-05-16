import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InventoryService, Flavor } from '../../../../../backend/inventory.service';
import { CardDataService, Card } from '../../../../../sharedservices/card-data.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {

  //-----Pagination State-----//

  // Controls pagination behavior:
  // - currentPage: the active page number
  // - cardsPerPage: number of cards shown per page
  currentPage = 1;
  cardsPerPage = 8;

  //-----Dependency Injection-----//

  // Injects services used by this component:
  // - InventoryService: fetches raw flavor data from the backend
  // - CardDataService: manages shared card state across views
  constructor(
    private inventoryService: InventoryService,
    private cardService: CardDataService
  ) {}

  //-----Lifecycle-----//


  // On component initialization, fetches flavor data from InventoryService
  // and maps it into card objects using the shared CardDataService.
  ngOnInit(): void {
    this.inventoryService.getFlavors().subscribe((flavors: Flavor[]) => {
      this.cardService.setFromFlavors(flavors);
    });
  }

  //-----Card Data Getters-----//

  //Returns all cards from the shared service
  get cards(): Card[] {
    return this.cardService.cards;
  }
  //Returns only the current page's slice of cards
  get paginatedCards(): Card[] {
    const start = (this.currentPage - 1) * this.cardsPerPage;
    return this.cards.slice(start, start + this.cardsPerPage);
  }


  //-----Page Navagation Logic-----//


  // Advances to the next page of cards if more pages are available.
  // Used for pagination navigation in the menu view.
  nextPage(): void {
    if (this.currentPage < Math.ceil(this.cards.length / this.cardsPerPage)) {
      this.currentPage++;
    }
  }

  // Moves to the previous page of cards if not already on the first page.
  // Used for pagination navigation in the menu view.
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  //-----Card Interaction Logic-----//


  // Increases the selected card's count by 1 using shared service logic.
  // Used by the "+" button in both menu and checkout views.
  increase(card: Card): void {
    this.cardService.increase(card);
  }

  // Decreases the selected card's count by 1 through the shared service.
  // Prevents count from going below zero. Used in both menu and checkout.
  decrease(card: Card): void {
    this.cardService.decrease(card);
  }

  // Expands the clicked card and collapses all others via the shared service.
  // Controls the visual toggle between default and expanded card views.
  toggleCard(card: Card): void {
    this.cardService.toggleCard(card);
  }
}
