import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InterventionService } from '../invervention-detail.service';
import { CommonModule } from '@angular/common';

interface Intervention {
    id: string;
    name: string;
    description: string;
    date: string;
    localisation: string;
}

@Component({
    selector: 'app-intervention-detail',
    imports: [CommonModule],
    templateUrl: './intervention-detail.component.html',
    styleUrls: ['./intervention-detail.component.css']
})
export class InterventionDetailComponent implements OnInit {
    intervention!: Intervention;
    loading: boolean = true;
    error: string = '';

    constructor(
        private route: ActivatedRoute,
        private interventionService: InterventionService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');

        if (id) {
            this.interventionService.getInterventionById(id).subscribe({
                next: (data) => {
                    this.intervention = data;
                    this.loading = false;
                },
                error: (err) => {
                    this.error = "Erreur lors de la récupération de l'intervention.";
                    this.loading = false;
                }
            });
        }
    }
}
