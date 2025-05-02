import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./layout/main/mainbody/pov/menu/menu.component";
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sprinkle-sprite';
}
