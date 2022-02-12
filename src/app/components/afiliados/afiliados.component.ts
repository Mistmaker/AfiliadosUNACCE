import { Component, OnInit } from '@angular/core';
import { AfiliadosService } from '../../services/afiliados.service';
import { Afiliado } from '../../models/afiliados';

@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styleUrls: ['./afiliados.component.css']
})
export class AfiliadosComponent implements OnInit {

  afiliados: Afiliado[] = [];

  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9, 12];

  textoBusqueda = '';

  constructor(private afiliadosService: AfiliadosService) { }

  ngOnInit(): void {
    this.afiliadosService.getAfiliados().subscribe(resp => {
      console.log(resp);
      this.afiliados = resp;
    });
  }

  onTableDataChange(event: any){
    this.page = event;
    // this.fetchPosts();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    // this.fetchPosts();
  }

}
