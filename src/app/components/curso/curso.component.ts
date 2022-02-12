import { Component, OnInit } from '@angular/core';
import { Curso, CursoDatosAdicionales, Modalidad } from '../../models/cursos';
import { NgForm } from '@angular/forms';
import { CursosService } from '../../services/cursos.service';
import Swal from 'sweetalert2';
import { maxFileSize } from '../../../environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {

  curso = new Curso();
  modalidades: Modalidad[] = [];

  files: FileList | undefined;
  cargando = false;
  cargado = false;
  nombreArchivo: string | undefined;

  constructor(private cursosService: CursosService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.curso.datosAdicionales = [];
    this.cursosService.getModalidades().subscribe(resp => {
      this.modalidades = resp;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo' && id !== null) {

      Swal.fire({ title: 'Espere', text: 'Cargando información', allowOutsideClick: false, icon: 'info', });
      Swal.showLoading();

      this.cursosService.getCurso(+id).subscribe(resp => {
        if (!resp.datosAdicionales) { resp.datosAdicionales = []; }
        this.curso = resp;
        console.log(resp)
        console.log(this.curso);
        Swal.close();
      }, (error) => {
        Swal.fire({ title: 'Error', text: 'No se pudo obtener los datos' })
      });

    }
  }

  guardar(form: NgForm) {
    if (form.invalid) { Swal.fire('Atención', 'Faltan campos por llenar, revisa e intenta nuevamente', 'info'); return; }
    console.log(this.curso);
    Swal.fire('Guardando...', 'Enviando información...', 'info');
    Swal.showLoading();

    this.cursosService.setCurso(this.curso).subscribe((resp: any) => {
      console.log(resp);
      if (!resp['err']) {
        this.curso.id = +resp['id'];
        Swal.fire('Éxito', resp['mensaje'], 'success');
      } else {
        Swal.fire('Error', `Ocurrió un error -> ${resp['mensaje']}`, 'error');
      }
    }, err => {
      console.log(err);
      Swal.fire('Error', `Ocurrió un error, revise que los campos estén llenados correctamente e intente de nuevo.`, 'error');
    });
  }

  eliminarCurso() {
    let eliminar = false;
    Swal.fire({ title: 'Confirmación', text: 'Desea eliminar este registro?', icon: 'warning', showDenyButton: true, confirmButtonText: `Eliminar`, denyButtonText: `No eliminar`, denyButtonColor: '#3085d6', confirmButtonColor: '#d33', }).then((result) => {
      if (result.isConfirmed) {
        eliminar = true;
        if (eliminar) {
          Swal.fire({ title: 'Espere', text: 'Eliminando información', allowOutsideClick: false, icon: 'info', });
          Swal.showLoading();

          this.cursosService.deleteCurso(this.curso.id.toString()).subscribe(resp => {
            Swal.fire('Eliminado!', 'Se eliminó los datos del afiliado', 'success').then(r => {
              this.router.navigateByUrl('cursos');
            });
          }, error => {
            console.log(error);
            Swal.fire('Error!', 'Ocurrió un error al eliminar', 'error');
          })
        }
      }
    });
  }

  agregarDatoAdicional() {
    this.curso.datosAdicionales.push(new CursoDatosAdicionales())
  }

  quitarDatoAdicional(pos: number) {
    this.curso.datosAdicionales.splice(pos, 1);
  }

  async cargaArchivo(event: any) {
    const file = event.target.files[0];

    console.log(file);
    if (!file) { return; }
    if (file.size > maxFileSize) { Swal.fire('No se puede cargar el archivo', 'El archivo no debe pesar mas de 15Mb', 'warning'); return; }

    try {

      let imgData: any = await toBase64(file);
      imgData = imgData.replace("data:", "")
        .replace(/^.+,/, "");
      if (imgData.length > 0) {
        this.curso.cur_imagen = imgData;
        // console.log(imgData);
      }

    } catch (error) {
      console.log(error)
    }



  }



}

const toBase64 = (file: any) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});