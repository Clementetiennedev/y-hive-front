import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [InputTextModule, FormsModule],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    isLoggedIn: boolean = false;
    user = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: ''
    };

    constructor(private profileService: ProfileService, private router: Router) { }

    ngOnInit(): void {
        this.profileService.getProfile().subscribe(
            (user) => {
                this.user = user;
            },
            (error) => {
                console.error('Erreur lors de la récupération des informations utilisateur', error);
            }
        );
    }

    logout() {
        this.profileService.logout().subscribe(
            () => {
                this.isLoggedIn = false;
                localStorage.removeItem('token');
                this.router.navigate(['/']);
            },
            (error) => {
                console.error('Erreur lors de la déconnexion', error);
            }
        );
    }
}
