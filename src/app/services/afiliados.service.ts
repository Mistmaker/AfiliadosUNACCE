import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlWs, urlWsCedulas, urlWsRuc } from '../../environments/environment.prod';
import { Afiliado } from '../models/afiliados';

@Injectable({
  providedIn: 'root'
})
export class AfiliadosService {

  private url = urlWs;
  private urlCedula = urlWsCedulas;
  private urlRuc = urlWsRuc;

  constructor(private http: HttpClient) { }

  getAfiliados() {
    return this.http.get<Afiliado[]>(`${this.url}/getAfiliados.php`);
  }

  getAfiliado(id: string) {
    return this.http.get<Afiliado>(`${this.url}/getAfiliado.php?id=${id}`);
  }

  setAfiliado(afiliado: Afiliado) {
    return this.http.post(`${this.url}/setAfiliado.php`, afiliado);
  }

  deleteAfiliado(id: string) {
    return this.http.get<Afiliado>(`${this.url}/deleteAfiliado.php?id=${id}`);
  }

  getDatosCedula(cedula: string) {
    return this.http.get(`${this.urlCedula}${cedula}`);
  }

  getDatosRuc(ruc: string) {
    return this.http.get(`${this.urlRuc}${ruc}`);
  }

}
