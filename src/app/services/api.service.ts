import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    get<T>(endpoint: string, params?: any, headers?: HttpHeaders): Observable<T> {
        return this.http.get<T>(`${this.API_URL}/${endpoint}`, {
            headers: this.getHeaders(headers),
            params: this.getParams(params)
        });
    }

    post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
        return this.http.post<T>(`${this.API_URL}/${endpoint}`, body, {
            headers: this.getHeaders(headers)
        });
    }

    put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
        return this.http.put<T>(`${this.API_URL}/${endpoint}`, body, {
            headers: this.getHeaders(headers)
        });
    }

    delete<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
        return this.http.delete<T>(`${this.API_URL}/${endpoint}`, {
            headers: this.getHeaders(headers)
        });
    }

    private getHeaders(customHeaders?: HttpHeaders): HttpHeaders {
        let headers = new HttpHeaders();

        if (customHeaders) {
            customHeaders.keys().forEach(key => {
                const values = customHeaders.getAll(key);
                if (values !== null) {
                    values.forEach(value => {
                        headers = headers.append(key, value);
                    });
                }
            });
        }

        const token = localStorage.getItem('token');

        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    }

    private getParams(params?: any): HttpParams {
        let httpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach(key => {
                httpParams = httpParams.set(key, params[key]);
            });
        }
        return httpParams;
    }
}
