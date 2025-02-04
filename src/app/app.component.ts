import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMainComponent } from "./components/feature-navbar/nav-main/nav-main.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavMainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'y-hive-front';
}
