import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { Materia } from 'src/app/shared/interfaces/shared.interface';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  constructor(private router: Router) { }

  getMaterias(): Observable<Materia[]>{
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.get<any>(`${this.baseUrl}/materias`, { headers })
    .pipe(
      map((materias: any) => materias)
    );
  }

  getMateria(id: string): Observable<Materia>{
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.get<any>(`${this.baseUrl}/materias/${id}`, { headers })
    .pipe(
      map((materia: any) => materia)
    );
  }

  addMateria(formAddMateria:any): Observable<Materia>{
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.post<any>(`${this.baseUrl}/materias`, formAddMateria, { headers })
    .pipe(
      map((response: any) => response)
    );
  }

  modifyMateria(formModifyMateria:any, id: string): Observable<Materia>{
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.put<any>(`${this.baseUrl}/materias/${id}`, formModifyMateria, { headers })
    .pipe(
      map((response: any) => response)
    );
  }

  borrarMateria(id: string) {
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.delete<any>(`${this.baseUrl}/materias/${id}`, { headers })
    .pipe(
      map((response: any) => response)
    );
  }

}
