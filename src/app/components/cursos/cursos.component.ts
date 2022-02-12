import { Component, OnInit } from '@angular/core';
import { Curso } from '../../models/cursos';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  cursos: Curso[] = [];

  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9, 12];

  textoBusqueda = '';

  constructor(
    private cursosService: CursosService
  ) { }

  ngOnInit(): void {
    this.cursosService.getCursos().subscribe(resp => {
      this.cursos = resp;
    });
  }

  onTableDataChange(event: any){
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

}
