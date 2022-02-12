import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  afiliados: number = 0;
  afi_pendientes: number = 0;
  afi_vigentes: number = 0;
  afi_por_caducar: number = 0;
  afi_caducados: number = 0;


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getDatosDashboard().subscribe((resp: any) => {
      console.log(resp);
      this.afiliados = resp["AFILIADOS"];
      this.afi_pendientes = resp["AFI_PENDIENTES"];
      this.afi_vigentes = resp["AFI_VIGENTES"];
      this.afi_por_caducar = resp["AFI_POR_CADUCAR"];
      this.afi_caducados = resp["AFI_CADUCADOS"];
    });
  }

}
