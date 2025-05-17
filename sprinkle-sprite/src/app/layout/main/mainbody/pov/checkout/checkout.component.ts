import { Component } from '@angular/core';
import { InventoryService } from '../../../../../backend/inventory.service';
import { CardDataService, Card } from '../../../../../sharedservices/card-data.service';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  seasonalItems: any[] = [];
card: any;
currentPage = 1;
cardsPerPage = 8;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.getFlavors().subscribe((items) => {
      this.seasonalItems = items.filter(item => item.rarity === 'Seasonal');
    });
  }
}
