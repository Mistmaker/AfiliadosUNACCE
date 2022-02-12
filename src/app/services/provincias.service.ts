import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlWs } from '../../environments/environment.prod';
import { Provincia } from '../models/provincias';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  private url = urlWs;

  constructor(private http: HttpClient) { }

  getProvincias() {
    return this.http.get<Provincia[]>(`${this.url}/getProvincias.php`);
  }

}
