import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { Aula } from 'src/app/shared/interfaces/shared.interface';

@Injectable({
  providedIn: 'root'
})
export class AulasService {
  private baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  constructor(private router: Router) { }

  getAulas(): Observable<Aula[]> {
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.get<any>(`${this.baseUrl}/aulas`, { headers })
    .pipe(
      map((aulas: any) => aulas)
    );
  }
  
  getAula(id: string): Observable<Aula>{
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.get<any>(`${this.baseUrl}/aulas/${id}`, { headers })
    .pipe(
      map((aula: any) => aula)
    );
  }

  addAula(formAddAula:any): Observable<Aula>{
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.post<any>(`${this.baseUrl}/aulas`, formAddAula, { headers })
    .pipe(
      map((response: any) => response)
    );
  }

  modifyAula(formModifyAula:any, id: string): Observable<Aula>{
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.put<any>(`${this.baseUrl}/aulas/${id}`, formModifyAula, { headers })
    .pipe(
      map((response: any) => response)
    );
  }

  borrarAula(id: string) {
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.delete<any>(`${this.baseUrl}/aulas/${id}`, { headers })
    .pipe(
      map((response: any) => response)
    );
  }

}
