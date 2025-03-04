import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	private readonly API_URL = environment.apiUrl;

	constructor(private readonly http: HttpClient) { }

	get<T>(endpoint: string, params?: any, customHeaders?: HttpHeaders, withCredentials: boolean = false): Observable<T> {
		return this.http.get<T>(`${this.API_URL}/${endpoint}`, {
			headers: customHeaders ?? new HttpHeaders(),
			params: this.getParams(params),
			withCredentials: withCredentials
		});
	}

	post<T>(endpoint: string, body: any, customHeaders?: HttpHeaders, withCredentials: boolean = false): Observable<T> {
		return this.http.post<T>(`${this.API_URL}/${endpoint}`, body, {
			headers: customHeaders ?? new HttpHeaders(),
			withCredentials: withCredentials
		});
	}

	put<T>(endpoint: string, body: any, customHeaders?: HttpHeaders): Observable<T> {
		return this.http.put<T>(`${this.API_URL}/${endpoint}`, body, {
			headers: customHeaders ?? new HttpHeaders()
		});
	}

	delete<T>(endpoint: string, customHeaders?: HttpHeaders): Observable<T> {
		return this.http.delete<T>(`${this.API_URL}/${endpoint}`, {
			headers: customHeaders ?? new HttpHeaders()
		});
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
