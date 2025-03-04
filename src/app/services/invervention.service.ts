import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Intervention } from '../models/intervention';
@Injectable({
	providedIn: 'root'
})

export class InterventionService {

	constructor(private readonly apiService: ApiService) { }

	getInterventionById(id: string): Observable<Intervention> {
		return this.apiService.get<Intervention>(`intervention/${id}`);
	}

	getInterventions(): Observable<Intervention[]> {
		return this.apiService.get<Intervention[]>('intervention/index');
	}
}
