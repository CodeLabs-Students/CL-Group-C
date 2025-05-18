import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CardDataService } from '../../../../../sharedservices/card-data.service';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  constructor(cardData: CardDataService) {}
}

