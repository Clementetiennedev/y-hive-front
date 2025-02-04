import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-nav-main',
  imports: [],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.scss'
})
export class NavMainComponent {
  //auth = inject(AuthService);
  // Variable pour savoir si le menu est ouvert ou fermé
  isDropdownOpen = false;

  // Méthode pour alterner l'état du dropdown
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
