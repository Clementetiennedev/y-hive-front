import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class ApiariesService {

	constructor(private readonly apiService: ApiService) { }

	getApiaries() {
		return this.apiService.get<any>('/apiary/index');
	}
}
