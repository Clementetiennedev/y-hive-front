import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../models/user';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {
	constructor(private readonly apiService: ApiService) { }

	getProfile(): Observable<User> {
		return this.apiService.get<User>('user');
	}

	updateProfile(profileData: Partial<User>): Observable<User> {
		return this.apiService.put<User>('user', profileData);
	}

	deleteProfile(): Observable<void> {
		return this.apiService.delete<void>('user');
	}

	
}
