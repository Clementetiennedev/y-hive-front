import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { CommonModule } from '@angular/common';


@Component({
	selector: 'app-nav-main',
	imports: [RouterModule, CommonModule],
	templateUrl: './nav-main.component.html',
	styleUrls: ['./nav-main.component.scss']
})
export class NavMainComponent implements OnInit {
	isLoggedIn: boolean = false;
	firstName: string = '';
	lastName: string = '';
	//auth = inject(AuthService);
	// Variable pour savoir si le menu est ouvert ou fermé
	isDropdownOpen = false;

	constructor(private readonly router: Router, private readonly homeService: HomeService) { }

	scrollToSection(sectionId: string) {
		this.router.navigate([], { fragment: sectionId }).then(() => {
			const element = document.getElementById(sectionId);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	}
	ngOnInit(): void {
		this.isLoggedIn = !!localStorage.getItem('token');
		if (this.isLoggedIn) {
			this.homeService.getUser().subscribe({
				next: (user) => {
					this.firstName = user.first_name;
					this.lastName = user.last_name;
				},
				error: (error) => {
					console.error('Erreur lors de la récupération des informations utilisateur', error);
				}
			});
		}
		else {
			console.log(this.isLoggedIn);
			this.firstName = '';
			this.lastName = '';
		}
	}
	// Méthode pour alterner l'état du dropdown
	toggleDropdown() {
		this.isDropdownOpen = !this.isDropdownOpen;
	}

	goToHome() {
		this.router.navigate(['/']);
	}
	redirectToLogin() {
		this.router.navigate(['/login']);
	}

	redirectToRegister() {
		this.router.navigate(['/register']);
	}

	goToProfile() {
		this.router.navigate(['/profile']);
	}
}
