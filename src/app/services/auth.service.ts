import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private readonly apiService: ApiService) { }

	login(credentials: { email: string, password: string }): Observable<{ token: string }> {
		return this.apiService.post<{ token: string }>('login', credentials);
	}

	register(user: { first_name: string, last_name: string, email: string, password: string, password_confirmation: string }): Observable<{ token: string }> {
		return this.apiService.post<{ token: string }>('register', user);
	}
}
