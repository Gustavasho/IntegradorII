export class Actividad {
    id: string;
    name: string;
    importancia: string;
    fecha_inicio: string;
    fecha_fin: string;
    fecha_registro: string;
    area: string;
    estado: number;
    porcentaje: number;
    registed_by: string;

    constructor(
        id: string = '',
        name: string = '',
        importancia: string = '',
        fecha_inicio: string = '',
        fecha_fin: string = '',
        fecha_registro: string = '',
        area: string = '',
        estado: number = 0,
        porcentaje: number = 0,
        registed_by: string = ''
    ) {
        this.id = id;
        this.name = name;
        this.importancia = importancia;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.fecha_registro = fecha_registro;
        this.area = area;
        this.estado = estado;
        this.porcentaje = porcentaje;
        this.registed_by = registed_by;
    }
}