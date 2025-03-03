import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiariesService {

  constructor(private http: HttpClient) { }
  baseUrl = "https://yhive-back.saillardq.fr";
  getApiaries(){
    return this.http.get<any>(`${this.baseUrl}/api/apiary/index`)
  }
}
