import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class HomeService {
    private apiUrl: string = 'https://67a1d689409de5ed52533d22.mockapi.io/api/stats';
    private userUrl: string = 'https://yhive-back.saillardq.fr/api/user';

    constructor(private http: HttpClient) { }

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    public getStats(): Observable<any> {
        return this.http.get<any>(this.apiUrl, { headers: this.getAuthHeaders() });
    }

    public getUser(): Observable<any> {
        return this.http.get<any>(this.userUrl, { headers: this.getAuthHeaders() });
    }
}
