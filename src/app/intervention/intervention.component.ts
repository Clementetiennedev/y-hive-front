import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-interventions',
    imports: [CommonModule],
    templateUrl: './intervention.component.html',
    styleUrls: ['./intervention.component.css']
})
export class InterventionsComponent implements OnInit {
    interventions: any[] = [];

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.http.get<any[]>('https://67a1d689409de5ed52533d22.mockapi.io/api/intervention').subscribe(data => {
            this.interventions = data;
        }, error => {
            console.error("Erreur lors du chargement des interventions", error);
        });
    }
}
