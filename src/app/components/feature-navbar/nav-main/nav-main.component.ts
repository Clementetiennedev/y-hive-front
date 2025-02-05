import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-main',
  imports: [],
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.scss']
})
export class NavMainComponent {
  //auth = inject(AuthService);
  // Variable pour savoir si le menu est ouvert ou fermé
  isDropdownOpen = false;

  constructor(private router: Router) {}

  // Méthode pour alterner l'état du dropdown
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}
