export class Ocurrencia {
    id: string;
    name: string;
    subactividad_code: string;
    actividad_code: string;
    fecha_registro: string;
    detalles: string;
    resuelta: number;
    registed_by: string;
    
    constructor(
        id: string = '',
        name: string = '',
        subactividad_code: string = '',
        actividad_code: string = '',
        fecha_registro: string = '',
        detalles: string = '',
        resuelta: number = 0,
        registed_by: string = ''
    ) {
        this.id = id;
        this.name = name;
        this.subactividad_code = subactividad_code;
        this.actividad_code = actividad_code;
        this.fecha_registro = fecha_registro;
        this.detalles = detalles;
        this.resuelta = resuelta;
        this.registed_by = registed_by;
    }
}