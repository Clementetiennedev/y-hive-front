import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterventionService } from '../../services/invervention.service';
import { Intervention } from '../../models/intervention';

@Component({
    selector: 'app-interventions',
    imports: [CommonModule],
    templateUrl: './intervention.component.html',
    styleUrls: ['./intervention.component.css']
})
export class InterventionsComponent implements OnInit {
    interventions!: Intervention[];

    constructor(private readonly interventionService: InterventionService) { }

    ngOnInit(): void {
        this.interventionService.getInterventions().subscribe({
            next: (data) => {
                this.interventions = data;
            },
            error: (error) => {
                console.error("Erreur lors du chargement des interventions", error);
            }
        });
    }
}
