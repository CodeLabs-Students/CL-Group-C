import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})

export class MenuComponent {
  title: string = 'My Card Title';
  content: string = 'This is some content for the card.';
  cards = [
    { title: 'Card 1', content: 'Content for card 1' },
    { title: 'Card 2', content: 'Content for card 2' },
    // Add more cards as needed
  ];

  increase() {
    // Logic for increasing something
  }

  decrease() {
    // Logic for decreasing something
  }

  // count: number = 0;

  // increase() {
  //   this.count++;
  // }

  // decrease() {
  //   this.count--;
  // }

  // cards = [
  //   {title: 'Card 1', content: 'ice cream'},
  //   {title: 'Card 2', content: 'ice cream'},
  //   {title: 'Card 3', content: 'ice cream'},
  // ]
}
