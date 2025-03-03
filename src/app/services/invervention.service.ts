import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Intervention {
    id: string;
    name: string;
    description: string;
    date: string;
    localisation: string;
}
@Injectable({
    providedIn: 'root'
})

export class InterventionService {
    private readonly apiUrl: string = 'https://67a1d689409de5ed52533d22.mockapi.io/api/intervention';

    constructor(private readonly http: HttpClient) { }

    getInterventionById(id: string): Observable<Intervention> {
        return this.http.get<Intervention>(`${this.apiUrl}/${id}`);
    }

    getInterventions(): Observable<Intervention[]> {
        return this.http.get<Intervention[]>(this.apiUrl);
    }
}
