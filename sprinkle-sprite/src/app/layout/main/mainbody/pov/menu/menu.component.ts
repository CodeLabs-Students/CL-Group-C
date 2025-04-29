import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})

export class MenuComponent {
  count: number = 0;

  increase() {
    this.count++;
  }

  decrease() {
    this.count--;
  }

  cards = [
    {title: 'Card 1', content: 'ice cream'},
    {title: 'Card 2', content: 'ice cream'},
    {title: 'Card 3', content: 'ice cream'},
  ]
}
