import { Component } from '@angular/core';
import { Apiary, Hive } from '../../../models/apiaries';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiariesService } from '../../../services/apiaries.service';


@Component({
	selector: 'app-apiaries',
	imports: [CommonModule, FormsModule],
	templateUrl: './apiaries.component.html',
	styleUrl: './apiaries.component.scss'
})
export class ApiariesComponent {
	apiaries: Apiary[] = [];
	showPopup = false;
  showPopup2 = false;
	newBeehiveName = '';
	newBeehiveLocation = '';
  newHiveType = '';
  newHiveName = '';
	newBeehiveDescription = '';
	newHiveCount = 1;
  selectedApiary: Apiary | null = null;

	constructor(private readonly apiaryService: ApiariesService) { }

	ngOnInit(): void {
		this.loadApiaries();
	}

	loadApiaries(): void {
		this.apiaryService.getApiaries().subscribe({
			next: (data) => {
				this.apiaries = data;
			},
			error: (error) => {
				console.error('Erreur lors de la récupération des ruchers :', error);
			}
		});
	}
  openPopup2(apiary: Apiary): void {
    this.selectedApiary = apiary;
		this.showPopup2 = true;
	}

	closePopup2(): void {
		this.showPopup2 = false;
	}
	openPopup(): void {
		this.showPopup = true;
	}

	closePopup(): void {
		this.showPopup = false;
	}

	addHive(apiary: Apiary): void {
    const newHive = {
			name: this.newHiveName,
			type: this.newHiveType,
      installation_date: new Date().toISOString()
		};
		this.apiaryService.addHive(apiary.id, newHive).subscribe({
			next: (hive) => {this.selectedApiary!.hives.push(hive);
        console.log(hive);
        this.newHiveName ='';
        this.newHiveType ='';
        this.closePopup2();
      },
			error: (error) => console.error('Erreur lors de l’ajout d’une ruche:', error)
		});
	}
	deleteHive(apiary: Apiary, hiveIndex: number) {
		const hiveId = apiary.hives[hiveIndex].id;

		// Appel de la méthode de suppression avec la bonne URL
		this.apiaryService.deleteHive(hiveId).subscribe(() => {
			apiary.hives.splice(hiveIndex, 1); // 🔹 Supprime la ruche de la liste locale
		});
	}

	editHive(hive: Hive) {
		hive.editing = true; // 🔹 Active le mode édition
	}

	saveHive(hive: Hive) {
		this.apiaryService.updateHive(hive.id, { name: hive.name }).subscribe((updatedHive) => {
			hive.name = updatedHive.name;
			hive.editing = false; // 🔹 Désactive le mode édition
		});
	}
	deleteApiary(apiaryId: number) {
		this.apiaryService.deleteApiary(apiaryId).subscribe(() => {
			this.apiaries = this.apiaries.filter(apiary => apiary.id !== apiaryId); // 🔹 Supprime le rucher localement
		});
	}

	createBeehive(): void {
		if (!this.newBeehiveName.trim() || !this.newBeehiveLocation.trim() || !this.newBeehiveDescription.trim()) {
			return;
		}

		const apiaryData = {
			name: this.newBeehiveName,
			location: this.newBeehiveLocation,
			description: this.newBeehiveDescription,
		};

		this.apiaryService.createApiaryWithHives(apiaryData, this.newHiveCount).subscribe({
			next: (apiary) => {
				this.apiaries.push(apiary);
				this.newBeehiveName = '';
				this.newBeehiveLocation = '';
				this.newBeehiveDescription = '';
				this.newHiveCount = 1;
				this.closePopup();
			},
			error: (error) => console.error('Erreur lors de la création du rucher:', error)
		});
	}
}
