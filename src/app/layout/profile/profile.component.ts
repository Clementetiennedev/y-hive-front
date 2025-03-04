import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [InputTextModule, FormsModule],
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
	isLoggedIn: boolean = false;
	user!: User;

	constructor(private readonly profileService: ProfileService, private readonly router: Router) { }

	ngOnInit(): void {
		this.profileService.getProfile().subscribe({
			next: (user) => {
				this.user = user;
			},
			error: (error) => {
				console.error('Erreur lors de la récupération des informations utilisateur', error);
			}
		});
	}

	logout() {
		this.profileService.logout().subscribe({
			next: () => {
				this.isLoggedIn = false;
				localStorage.removeItem('token');
				this.router.navigate(['/']);
			},
			error: (error) => {
				console.error('Erreur lors de la déconnexion', error);
			}
		});
	}
}
