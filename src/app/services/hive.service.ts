import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Hive {
    id: number;
    apiary_id: number;
    name: string;
    type: string;
    installation_date: string;
}
@Injectable({
    providedIn: 'root'
})
export class HiveService {
    private apiUrl = `http://localhost/api/hive/index`;

    constructor(private http: HttpClient) { }

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    getAllHives(): Observable<Hive[]> {
        return this.http.get<Hive[]>(this.apiUrl, { headers: this.getAuthHeaders() });
    }

    getHive(id: string): Observable<Hive> {
        return this.http.get<Hive>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
    }

    createHive(hive: Hive): Observable<Hive> {
        return this.http.post<Hive>(this.apiUrl, hive, { headers: this.getAuthHeaders() });
    }

    updateHive(id: string, hive: Hive): Observable<Hive> {
        return this.http.put<Hive>(`${this.apiUrl}/${id}`, hive, { headers: this.getAuthHeaders() });
    }

    deleteHive(id: string): Observable<Hive> {
        return this.http.delete<Hive>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
    }
}
