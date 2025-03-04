import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private readonly apiService: ApiService) { }

	private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken()); 
	isLoggedIn$ = this.isLoggedInSubject.asObservable(); 
		private hasToken(): boolean {
			if (typeof window !== 'undefined' && window.localStorage) {
			  return !!localStorage.getItem('token');
			}
			return false;
		  }
	login(credentials: { email: string, password: string }): Observable<{ token: string }> {
		this.isLoggedInSubject.next(true);
		return this.apiService.post<{ token: string }>('login', credentials);
	}
	isLoggedIn(): boolean {
		return !!localStorage.getItem('authToken');
	  }
	register(user: { first_name: string, last_name: string, email: string, password: string, password_confirmation: string }): Observable<{ token: string }> {
		return this.apiService.post<{ token: string }>('register', user);
	}
  
	logout(): Observable<{token: string}> {
		this.isLoggedInSubject.next(false); 
		return this.apiService.post<{token: string}>('logout', {});
	  }
	  

}
