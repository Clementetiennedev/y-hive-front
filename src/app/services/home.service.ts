import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
	providedIn: 'root'
})
export class HomeService {

	constructor(private readonly apiService: ApiService) { }

	public getUser(): Observable<any> {
		return this.apiService.get<any>('user');
	}
}
