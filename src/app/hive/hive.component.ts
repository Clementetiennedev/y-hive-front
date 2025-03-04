import { Component, OnInit } from '@angular/core';
import { HiveService } from '../services/hive.service';
import { MessageService } from 'primeng/api';
import { PopoverModule } from 'primeng/popover';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

interface Hive {
	id: number;
	apiary_id: number;
	name: string;
	type: string;
	installation_date: string;
}
@Component({
	selector: 'app-hive',
	templateUrl: './hive.component.html',
	standalone: true,
	imports: [PopoverModule, TableModule, ButtonModule, TagModule],
	providers: [MessageService]
})
export class HiveComponent implements OnInit {
	hives: Hive[] = [];
	loading: boolean = true;
	error: string | null = null;

	constructor(private readonly hiveService: HiveService) { }

	ngOnInit(): void {
		this.loadHives();
	}

	loadHives(): void {
		this.loading = true;
		this.hiveService.getAllHives().subscribe({
			next: (data) => {
				this.hives = data;
				this.loading = false;
			},
			error: (err) => {
				this.error = 'Failed to load hives';
				this.loading = false;
				console.error(err);
			}
		});
	}

	createHive(hiveData: Hive): void {
		this.hiveService.createHive(hiveData).subscribe({
			next: (newHive) => {
				this.hives.push(newHive);
			},
			error: (err) => {
				this.error = 'Failed to create hive';
				console.error(err);
			}
		});
	}

	updateHive(id: string, hiveData: Hive): void {
		this.hiveService.updateHive(id, hiveData).subscribe({
			next: (updatedHive) => {
				const index = this.hives.findIndex(hive => hive.id === parseInt(id));
				if (index !== -1) {
					this.hives[index] = updatedHive;
				}
			},
			error: (err) => {
				this.error = 'Failed to update hive';
				console.error(err);
			}
		});
	}

	deleteHive(id: string): void {
		this.hiveService.deleteHive(id).subscribe({
			next: () => {
				this.hives = this.hives.filter(hive => hive.id !== parseInt(id));
			},
			error: (err) => {
				this.error = 'Failed to delete hive';
				console.error(err);
			}
		});
	}
}
