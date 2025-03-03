import { Component, OnInit } from '@angular/core';
import { HiveService } from '../../services/hive.service';
import { HomeService } from '../../services/home.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    stats: { numberRuche: number } | null = null;
    loading: boolean = true;
    error: string | null = null;
    firstName: string | null = null;

    constructor(private hiveService: HiveService, private homeService: HomeService) { }

    ngOnInit(): void {
        this.loadStats();
        this.getUserInfo();
    }

    loadStats(): void {
        this.loading = true;
        this.hiveService.getAllHives().subscribe({
            next: (data) => {
                this.stats = { numberRuche: data.length };
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Failed to load stats';
                this.loading = false;
                console.error(err);
            }
        });
    }

    getUserInfo(): void {
        this.homeService.getUser().subscribe({
            next: (data) => {
                this.firstName = data.first_name;
            },
            error: (err) => {
                console.error(err);
            }
        });
    }
}
