import { Injectable } from '@angular/core';
import { Observable, switchMap, lastValueFrom } from 'rxjs';
import { Apiary, Hive } from '../models/apiaries';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class ApiariesService {

	constructor(private readonly apiService: ApiService) { }

	deleteHive(hiveId: number): Observable<void> {
		return this.apiService.delete<void>(`hive/${hiveId}`);
	}

	updateHive(hiveId: number, updatedHive: { name: string }): Observable<Hive> {
		return this.apiService.put<Hive>(`hive/${hiveId}`, updatedHive);
	}
	deleteApiary(apiaryId: number): Observable<void> {
		return this.apiService.delete<void>(`apiary/${apiaryId}`);
	}

	/** 🔹 Créer un rucher avec des ruches */
	createApiaryWithHives(apiaryData: { name: string; location: string; description: string }, hiveCount: number): Observable<Apiary> {
		return this.apiService.post<Apiary>('apiary/store', apiaryData).pipe(
			switchMap((apiary) => {
				if (hiveCount > 0) {
					return this.createHivesForApiary(apiary, hiveCount);
				}
				return this.createEmptyApiary(apiary);
			})
		);
	}

	private createHivesForApiary(apiary: Apiary, hiveCount: number): Observable<Apiary> {
		const hiveRequests: Observable<Hive>[] = [];
		for (let i = 1; i <= hiveCount; i++) {
			const hiveData = {
				name: `Ruche ${i}`,
				type: 'Standard',
				installation_date: new Date().toISOString(),
			};
			hiveRequests.push(this.addHive(apiary.id, hiveData));
		}

		return new Observable<Apiary>((observer) => {
			Promise.all(hiveRequests.map((req) => lastValueFrom(req)))
				.then((hives) => {
					apiary.hives = hives.filter((hive): hive is Hive => !!hive);
					observer.next(apiary);
					observer.complete();
				})
				.catch((error) => observer.error(error));
		});
	}

	private createEmptyApiary(apiary: Apiary): Observable<Apiary> {
		return new Observable<Apiary>((observer) => {
			observer.next(apiary);
			observer.complete();
		});
	}

	getApiaries(): Observable<Apiary[]> {
		return this.apiService.get<Apiary[]>('apiary/index');
	}

	addHive(apiaryId: number, hive: Partial<Hive>): Observable<Hive> {
		return this.apiService.post<Hive>(`apiary/${apiaryId}/hive`, hive);
	}
}