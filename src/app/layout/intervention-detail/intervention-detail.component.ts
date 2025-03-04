import { Component, OnInit } from '@angular/core';
import { InterventionService } from '../../services/invervention.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Intervention } from '../../models/intervention';

@Component({
	selector: 'app-intervention-detail',
	imports: [CommonModule, RouterModule],
	templateUrl: './intervention-detail.component.html',
	styleUrls: ['./intervention-detail.component.css']
})
export class InterventionDetailComponent implements OnInit {
	intervention!: Intervention;
	loading: boolean = true;
	error: string = '';

	constructor(
		private readonly interventionService: InterventionService,
		private readonly route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			const id = params['id'];
			this.getInterventionById(id);
		});
	}

	getInterventionById(id: string): void {
		this.interventionService.getInterventionById(id).subscribe({
			next: (data) => {
				this.intervention = data;
				this.loading = false;
			},
			error: (error) => {
				this.error = 'Erreur de récupération des données';
				this.loading = false;
			}
		});
	}
}
