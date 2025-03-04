import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Hive } from '../models/hive';

@Injectable({
	providedIn: 'root'
})
export class HiveService {

	constructor(private readonly apiService: ApiService) { }

	getAllHives(): Observable<Hive[]> {
		return this.apiService.get<Hive[]>('hive/index');
	}

	getHive(id: string): Observable<Hive> {
		return this.apiService.get<Hive>(`hive/${id}`);
	}

	createHive(hive: Hive): Observable<Hive> {
		return this.apiService.post<Hive>('hive', hive);
	}

	updateHive(id: string, hive: Hive): Observable<Hive> {
		return this.apiService.put<Hive>(`hive/${id}`, hive);
	}

	deleteHive(id: string): Observable<Hive> {
		return this.apiService.delete<Hive>(`hive/${id}`);
	}
}
