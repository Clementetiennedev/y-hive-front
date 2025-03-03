import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
    stats: any;
    firstName: string = '';

    constructor(private readonly homeService: HomeService) { }

    ngOnInit(): void {
        this.homeService.getStats().subscribe(
            (data) => {
                this.stats = data[0];
            },
            (error) => {
                console.error('Erreur lors de la récupération des articles', error);
            }
        );

        this.homeService.getUser().subscribe(
            (user) => {
                this.firstName = user.first_name;
            }
        );
    }
}
