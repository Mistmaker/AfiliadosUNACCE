export class Curso {
    id!: number;
    id_modalidad!: string;
    cur_descripcion!: string;
    cur_estado!: boolean;
    mod_nombre!: string;
    cur_imagen!: string;
    datosAdicionales!: CursoDatosAdicionales[];
    constructor(){
        this.cur_imagen = '';
        this.cur_estado = true;
        this.datosAdicionales = [];
    }
}

export class Modalidad {
    id!: number;
    mod_nombre!: string;
}

export class CursoDatosAdicionales {
    id!: number;
    descripcion!: string;
    dato1!: string;
    dato2!: boolean;
}
