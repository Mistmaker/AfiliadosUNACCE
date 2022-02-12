import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlWs } from '../../environments/environment.prod';
import { Nacionalidad } from '../models/nacionalidades';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadesService {

  private url = urlWs;

  constructor(private http: HttpClient) { }

  getNacionalidades() {
    return this.http.get<Nacionalidad[]>(`${this.url}/getNacionalidades.php`);
  }
}
