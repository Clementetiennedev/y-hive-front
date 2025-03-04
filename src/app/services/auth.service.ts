import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loginUrl = 'auth/login';
    private registerUrl = 'auth/register';

    constructor(private apiService: ApiService) { }

    login(credentials: { email: string, password: string }): Observable<{ token: string }> {
        return this.apiService.post<{ token: string }>(this.loginUrl, credentials);
    }

    register(user: { first_name: string, last_name: string, email: string, password: string, password_confirmation: string }): Observable<{ token: string }> {
        return this.apiService.post<{ token: string }>(this.registerUrl, user);
    }
}
