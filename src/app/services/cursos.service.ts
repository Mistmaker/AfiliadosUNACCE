import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso, Modalidad } from '../models/cursos';
import { urlWs } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private url = urlWs;
  constructor(private http: HttpClient) { }

  getCursos() {
    return this.http.get<Curso[]>(`${this.url}/getCursos.php`);
  }

  getCurso(id: number) {
    return this.http.get<Curso>(`${this.url}/getCurso.php?id=${id}`);
  }

  setCurso(curso: Curso) {
    return this.http.post(`${this.url}/setCurso.php`, curso);
  }

  deleteCurso(id: string) {
    return this.http.get<Curso>(`${this.url}/deleteCurso.php?id=${id}`);
  }

  // Modalidades

  getModalidades() {
    return this.http.get<Modalidad[]>(`${this.url}/getModalidades.php`);
  }

}
