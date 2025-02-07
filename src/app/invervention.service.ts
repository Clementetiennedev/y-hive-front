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

export class InverventionService {
    private apiUrl: string = 'https://67a1d689409de5ed52533d22.mockapi.io/api/intervention';

    constructor(private http: HttpClient) { }

    public getIntervention(): Observable<Intervention> {
        return this.http.get<Intervention>(this.apiUrl)
    }
}
