import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Apiary, Hive } from '../models/apiaries';

@Injectable({
  providedIn: 'root'
})
export class ApiariesService {
  private baseUrl = 'https://yhive-back.saillardq.fr/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Modifier si nécessaire
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
  deleteHive(hiveId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/hive/${hiveId}`, { headers: this.getHeaders() });
  }
  
  updateHive(hiveId: number, updatedHive: { name: string }): Observable<Hive> {
    return this.http.post<Hive>(`${this.baseUrl}/hive/${hiveId}`, updatedHive, { headers: this.getHeaders() });
  }
  deleteApiary(apiaryId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/apiary/${apiaryId}`, { headers: this.getHeaders() });
  }
  
 /** 🔹 Créer un rucher avec des ruches */
 createApiaryWithHives(apiaryData: { name: string; location: string; description: string }, hiveCount: number): Observable<Apiary> {
  return this.http.post<Apiary>(`${this.baseUrl}/apiary/store`, apiaryData, { headers: this.getHeaders() }).pipe(
    switchMap((apiary) => {
      if (hiveCount > 0) {
        const hiveRequests: Observable<Hive>[] = [];
        for (let i = 1; i <= hiveCount; i++) {
          const hiveData = {
            name: `Ruche ${i}`,
            type: 'Standard',
            installation_date: new Date().toISOString(),
          };
          hiveRequests.push(this.addHive(apiary.id, hiveData));
        }
        
        return new Observable<Apiary>((observer) => {
          Promise.all(hiveRequests.map((req) => req.toPromise()))
            .then((hives) => {
              apiary.hives = hives.filter((hive): hive is Hive => !!hive); // 🔹 Filtrer les valeurs undefined
              observer.next(apiary);
              observer.complete();
            })
            .catch((error) => observer.error(error));
        });
      }

      return new Observable<Apiary>((observer) => {
        observer.next(apiary);
        observer.complete();
      });
    })
  );
}

  /** 🔹 Récupérer tous les ruchers avec leurs ruches */
  getApiaries(): Observable<Apiary[]> {
    return this.http.get<Apiary[]>(`${this.baseUrl}/apiary/index`, {
      headers: this.getHeaders(),
    });
  }

  /** 🔹 Ajouter une ruche dans un rucher */
  addHive(apiaryId: number, hive: Partial<Hive>): Observable<Hive> {
    return this.http.post<Hive>(`${this.baseUrl}/apiary/${apiaryId}/hive`, hive, {
      headers: this.getHeaders(),
    });
  }

}
