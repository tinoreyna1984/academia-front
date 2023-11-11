import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { Profesor } from 'src/app/shared/interfaces/shared.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  private baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  constructor(private router: Router) { }

  getProfesores(): Observable<Profesor[]>{
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.get<any>(`${this.baseUrl}/profesores`, { headers })
    .pipe(
      map((profesores: any) => profesores)
    );
  }

  getProfesor(id: string): Observable<Profesor>{
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.get<any>(`${this.baseUrl}/profesores/${id}`, { headers })
    .pipe(
      map((profesor: any) => profesor)
    );
  }

  addProfesor(formAddProfesor:any): Observable<Profesor>{
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.post<any>(`${this.baseUrl}/profesores`, formAddProfesor, { headers })
    .pipe(
      map((response: any) => response)
    );
  }

  modifyProfesor(formModifyProfesor:any, id: string): Observable<Profesor>{
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.put<any>(`${this.baseUrl}/profesores/${id}`, formModifyProfesor, { headers })
    .pipe(
      map((response: any) => response)
    );
  }

  borrarProfesor(id: string) {
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.delete<any>(`${this.baseUrl}/profesores/${id}`, { headers })
    .pipe(
      map((response: any) => response)
    );
  }

}
