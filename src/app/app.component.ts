import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMainComponent } from "./components/nav-main/nav-main.component";
import { PrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavMainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    constructor(private primeng: PrimeNG) {
        this.primeng.theme.set({
            preset: Aura,
                options: {
                    cssLayer: {
                        name: 'primeng',
                        order: 'tailwind-base, primeng, tailwind-utilities'
                    }
                }
            })
        }
      }

