import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})

export class MenuComponent {
 
  Flavors: string = '';
  id!: number;

  count: number = 0;

  increase() {
    this.count++; 
  }

  decrease() {
    this.count--;
  }

}
