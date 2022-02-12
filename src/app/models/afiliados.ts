export class Afiliado {
    id!: number;
    id_nacionalidad!: number;
    id_provincia!: number;
    id_curso!: number;
    afi_numero!: string;
    afi_apellidos!: string;
    afi_nombres!: string;
    afi_cedula!: string;
    afi_tiposuscripcion!: string;
    afi_fecha_nacimiento!: string;
    afi_direccion!: string;
    afi_inteseccion!: string;
    afi_barrio!: string;
    afi_ciudad!: string;
    afi_telefono!: string;
    afi_celular!: string;
    afi_email_particular!: string;
    afi_email_laboral!: string;
    afi_fecha_presentacion!: string;
    afi_fecha_incorporacion!: string;
    afi_fecha_vencimiento!: string;
    afi_foto!: string;
    afi_estado!: string;
    afi_categoria!: string;

    afi_ruc_facturacion!: string;
    afi_nombre_facturacion!: string;
    afi_direccion_facturacion!: string;
    afi_email_facturacion!: string;
    afi_telefono_facturacion!: string;
    afi_observacion_facturacion!: string;

    afi_ruc_contacto!: string;
    afi_nombre_contacto!: string;
    afi_direccion_contacto!: string;
    afi_email_contacto!: string;
    afi_telefono_contacto!: string;
    afi_observacion_contacto!: string;

    afi_afiliado_unacce!: string;
    afi_colegio_afiliacion!: string;
    afi_empresa!: string;
    afi_pregunta_cursos_online!: string;
    afi_pregunta_tema_cursos!: string;

    // estadoSuscripcion: EstadoSuscripcion[];
    // antecedentesLaborales: AntecendentesLaborales[];

    constructor() {

        let date = new Date();
        let dia: string, mes: string, anio: number;

        dia = date.getDate().toString().length < 2 ? `0${date.getDate().toString()}` : date.getDate().toString();
        mes = (date.getMonth() + 1).toString();
        mes = mes.length < 2 ? `0${mes}` : mes;
        anio = date.getFullYear();

        // this.estadoSuscripcion = [];
        // this.antecedentesLaborales = [];
        this.afi_fecha_presentacion = `${anio}/${mes}/${dia}`;
        this.afi_estado = 'SA';
    }
}
