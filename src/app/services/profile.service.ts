import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../models/user';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {
	constructor(private readonly apiService: ApiService) { }

	getProfile(): Observable<User> {
		return this.apiService.get<User>('profile');
	}

	updateProfile(profileData: Partial<User>): Observable<User> {
		return this.apiService.put<User>('profile', profileData);
	}

	deleteProfile(): Observable<void> {
		return this.apiService.delete<void>('profile');
	}

	logout(): Observable<void> {
		return this.apiService.post<void>('logout', {});
	}
}
