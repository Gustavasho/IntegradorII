export class Subactividad {
    id: string;
    name: string;
    actividad_code: string;
    fecha_inicio: string;
    fecha_fin: string;
    fecha_registro: string;
    estado: number;
    cant_ocurrencias: number;
    registed_by: string;

    constructor(
        id: string = '',
        name: string = '',
        actividad_code: string = '',
        fecha_inicio: string = '',
        fecha_fin: string = '',
        fecha_registro: string = '',
        estado: number = 0,
        cant_ocurrencias: number = 0,
        registed_by: string = ''
    ) {
        this.id = id;
        this.name = name;
        this.actividad_code = actividad_code;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.fecha_registro = fecha_registro;
        this.estado = estado;
        this.cant_ocurrencias = cant_ocurrencias;
        this.registed_by = registed_by;
    }
}