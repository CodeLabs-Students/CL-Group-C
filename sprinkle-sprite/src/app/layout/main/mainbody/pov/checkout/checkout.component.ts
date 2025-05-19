import { Component, inject, computed} from '@angular/core';
import { CardDataService } from '../../../../../sharedservices/card-data.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  readonly cardDataService = inject(CardDataService);
  readonly totalPrice = computed(() => this.cardDataService.totalPrice());
  readonly totalCount = computed(() => this.cardDataService.totalCount());
}

