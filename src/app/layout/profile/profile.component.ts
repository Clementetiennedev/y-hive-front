import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
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

	constructor(private readonly profileService: ProfileService, private authServices: AuthService, private readonly router: Router) { }

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

	logout(): void {
		this.authServices.logout().subscribe({
		  next: () => {
			console.log("Déconnexion réussie");
			localStorage.removeItem('token'); 
			window.location.href = '/landing';
		  },
		  error: (error) => {
			console.error('Erreur lors de la déconnexion', error);
		  }
		});
	  }
	  
}
