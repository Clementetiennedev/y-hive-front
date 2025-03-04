import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private userUrl: string = 'https://yhive-back.saillardq.fr/api/user';

    constructor(private http: HttpClient) { }

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    public getProfile(): Observable<any> {
        return this.http.get<any>(this.userUrl, { headers: this.getAuthHeaders() });
    }

    public logout(): Observable<any> {
        return new Observable(observer => {
            this.http.post<any>('https://yhive-back.saillardq.fr/api/logout', {}, { headers: this.getAuthHeaders() })
                .subscribe({
                    next: (response) => {
                        localStorage.removeItem('token');
                        observer.next(response);
                        observer.complete();
                    },
                    error: (error) => {
                        localStorage.removeItem('token');
                        observer.error(error);
                    }
                });
        });
    }
}
