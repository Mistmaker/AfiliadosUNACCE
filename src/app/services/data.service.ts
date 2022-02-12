import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlWs } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = urlWs;
  constructor(private http: HttpClient) { }

  getDatosDashboard() {
    return this.http.get(`${this.url}/getDatosDashboard.php`);
  }
}
