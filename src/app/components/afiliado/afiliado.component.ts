import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';

import { Provincia } from 'src/app/models/provincias';
import { Nacionalidad } from '../../models/nacionalidades';

import { Afiliado } from '../../models/afiliados';
import { ProvinciasService } from '../../services/provincias.service';
import { NacionalidadesService } from '../../services/nacionalidades.service';
import { AfiliadosService } from '../../services/afiliados.service';
import { CursosService } from '../../services/cursos.service';
import { Curso } from '../../models/cursos';
import { imgDefault } from '../../../environments/environment.prod';

@Component({
  selector: 'app-afiliado',
  templateUrl: './afiliado.component.html',
  styleUrls: ['./afiliado.component.css']
})
export class AfiliadoComponent implements OnInit {

  afiliado = new Afiliado();
  provincias: Provincia[] = [];
  nacionalidades: Nacionalidad[] = [];
  cursos: Curso[] = [];
  cursoSeleccionado = new Curso();

  buscando = false;
  aceptaTerminosCondiciones = false;
  imagenCurso = imgDefault;

  constructor(
    private route: ActivatedRoute,
    private cursosService: CursosService,
    private provinciasService: ProvinciasService,
    private nacionalidadesService: NacionalidadesService,
    private afiliadosService: AfiliadosService,
    private router: Router
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo' && id !== null) {

      Swal.fire({ title: 'Espere', text: 'Cargando información', allowOutsideClick: false, icon: 'info', });
      Swal.showLoading();

      this.afiliadosService.getAfiliado(id).subscribe(resp => {
        this.afiliado = resp;
        console.log(resp);
        Swal.close();

      }, (error) => {
        Swal.fire({ title: 'Error', text: 'No se pudo obtener los datos' })
      });
    }

    console.log(this.cursoSeleccionado);
    // this.cursoSeleccionado.cur_imagen = this.imagenCurso;
    this.cursosService.getCursos().subscribe(resp => {
      console.log(resp);
      this.cursos = resp;
    });

    this.provinciasService.getProvincias().subscribe(resp => {
      this.provincias = resp;
    });

    this.nacionalidadesService.getNacionalidades().subscribe(resp => {
      this.nacionalidades = resp;
      // console.log(resp);
      this.afiliado.id_nacionalidad = this.nacionalidades[0].id;
    });

    if (id === 'nuevo' || id === null) {
      // this.agregarEstadoSuscripcion();
      // this.agregarAntLaboral();
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      Swal.fire('Atención', 'Faltan campos por llenar, revisa e intenta nuevamente', 'info');
      return;
    }
    console.log(this.afiliado);
    Swal.fire({ title: 'Espere', text: 'Guardando información', allowOutsideClick: false, icon: 'info', });
    Swal.showLoading();

    this.afiliadosService.setAfiliado(this.afiliado).subscribe((resp: any) => {
      console.log(resp);

      if (resp['err']) {
        Swal.fire({ title: 'Error', text: resp['mensaje'], icon: 'error', });
      } else {
        Swal.fire({ title: 'Listo', text: 'Realizado exitozamente', icon: 'success', }).then(r => {
          if (this.hasRoute('matricula')) {
            window.open('https://begroupec.com/', "_self");
          } else { this.router.navigateByUrl('\afiliados'); }
        });
      }

    }, error => {
      console.log(error);
      Swal.fire({ title: 'Error', text: 'Ocurrió un error al guardar la Información ', icon: 'error', });
    });

  }

  buscarDatosOnLine() {
    if (!this.afiliado.afi_cedula) {
      Swal.fire('Advertencia', 'Ingrese un número de identificación', 'warning');
      return;
    }
    if (this.afiliado.afi_cedula.length === 10) {
      // Swal.fire('Advertencia', 'Cédulas deben tener 10 dígitos', 'warning');
      // return;
      this.buscando = true;
      this.afiliadosService.getDatosCedula(this.afiliado.afi_cedula).subscribe((resp: any) => {
        this.procesarDatos(resp["result"][0]);
        this.buscando = false;
      }, error => {
        this.buscando = false;
      });
    }
    if (this.afiliado.afi_cedula.length === 13) {
      this.buscando = true;
      this.afiliadosService.getDatosRuc(this.afiliado.afi_cedula).subscribe((resp: any) => {
        this.afiliado.afi_nombres = resp["Razón Social:"];

        const stringArray: [] = resp["Razón Social:"].split(" ");

        this.afiliado.afi_apellidos = '';
        this.afiliado.afi_nombres = '';

        for (let i = 0; i < stringArray.length; i++) {
          if (i <= 1) { this.afiliado.afi_apellidos += (stringArray[i] + " ") }
          if (i > 1) { this.afiliado.afi_nombres += (stringArray[i] + " ") }
        }

        this.afiliado.afi_apellidos = this.afiliado.afi_apellidos.trim();
        this.afiliado.afi_nombres = this.afiliado.afi_nombres.trim();

        this.buscando = false;
      }, error => {
        this.buscando = false;
      });
    }

  }

  cargarDatosAdicionalesCurso(){
    // this.cursoSeleccionado.cur_imagen = this.imagenCurso;
    this.cursosService.getCurso(this.afiliado.id_curso).subscribe(resp=>{
      console.log(resp);
      this.cursoSeleccionado = resp;
    })
  }

  procesarDatos(datos: any) {
    if (datos["identity"]) {
      const stringArray: [] = datos["name"].split(" ");

      this.afiliado.afi_apellidos = '';
      this.afiliado.afi_nombres = '';

      for (let i = 0; i < stringArray.length; i++) {
        if (i <= 1) { this.afiliado.afi_apellidos += (stringArray[i] + " ") }
        if (i > 1) { this.afiliado.afi_nombres += (stringArray[i] + " ") }
      }

      this.afiliado.afi_apellidos = this.afiliado.afi_apellidos.trim();
      this.afiliado.afi_nombres = this.afiliado.afi_nombres.trim();

      // this.afiliado.afi_nombres = datos["name"];
      this.afiliado.afi_direccion = datos["residence"] + ' ' + datos["streets"] + ' ' + datos["homenumber"];
      this.afiliado.afi_fecha_nacimiento = this.limpiarFecha(datos["dob"]);
      if (datos["nationality"] === "ECUATORIANA") { this.afiliado.id_nacionalidad = 1; }
    }
  }

  limpiarFecha(fecha: string): string {
    let date = fecha.split('/');
    return `${date[2]}-${date[1]}-${date[0]}`;
  }

  aprobarIngreso() {

    let date = new Date();
    let dia: string, mes: string, anio: number;

    dia = date.getDate().toString().length < 2 ? `0${date.getDate().toString()}` : date.getDate().toString();
    mes = date.getMonth().toString().length < 2 ? `0${date.getMonth().toString()}` : date.getMonth().toString();
    anio = date.getFullYear();

    this.afiliado.afi_estado = 'AP';
    this.afiliado.afi_fecha_incorporacion = `${anio}/${mes}/${dia}`;
    this.afiliado.afi_fecha_vencimiento = `${anio + 1}/${mes}/${dia}`;
  }

  renovarIngreso() {

    let date = new Date();
    let dia: string, mes: string, anio: number;

    dia = date.getDate().toString().length < 2 ? `0${date.getDate().toString()}` : date.getDate().toString();
    mes = date.getMonth().toString().length < 2 ? `0${date.getMonth().toString()}` : date.getMonth().toString();
    anio = date.getFullYear();

    this.afiliado.afi_estado = 'AP';
    // this.afiliado.afi_fecha_incorporacion = `${anio}/${mes}/${dia}`;
    this.afiliado.afi_fecha_vencimiento = `${anio + 1}/${mes}/${dia}`;
  }

  eliminarAfiliado() {
    let eliminar = false;
    Swal.fire({ title: 'Confirmación', text: 'Desea eliminar este registro?', icon: 'warning', showDenyButton: true, confirmButtonText: `Eliminar`, denyButtonText: `No eliminar`, denyButtonColor: '#3085d6', confirmButtonColor: '#d33', }).then((result) => {
      if (result.isConfirmed) {
        eliminar = true;
        if (eliminar) {
          Swal.fire({ title: 'Espere', text: 'Eliminando información', allowOutsideClick: false, icon: 'info', });
          Swal.showLoading();

          this.afiliadosService.deleteAfiliado(this.afiliado.id.toString()).subscribe(resp => {
            Swal.fire('Eliminado!', 'Se eliminó los datos del afiliado', 'success').then(r => {
              this.router.navigateByUrl('\afiliados');
            });
          }, error => {
            console.log(error);
            Swal.fire('Error!', 'Ocurrió un error al eliminar', 'error');
          })
        }
      }
    });

  }

  hasRoute(ruta: string) {
    return this.router.url.includes(ruta);
  }

}
