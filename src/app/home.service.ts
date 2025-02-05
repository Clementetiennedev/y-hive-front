import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl: string = 'https://67a1d689409de5ed52533d22.mockapi.io/api/stats';

  constructor(private http: HttpClient) {}

  public getStats(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }

}
