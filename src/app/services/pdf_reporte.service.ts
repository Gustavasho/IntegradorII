import { DatePipe } from "@angular/common";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
// @ts-ignore
import pdfMake from "pdfmake/build/pdfmake";
// @ts-ignore
import pdfFonts from "pdfmake/build/vfs_fonts";
import { styles } from "./pdf_reporte.config";
// @ts-ignore
import * as fs from 'file-saver';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
    providedIn: "root",
})
export class PdfReporteService {

    private datePipe = new DatePipe("en-US");

    constructor(
        private _http: HttpClient,
    ) { }

    async generatePdf(actividades: any[], subactividades: any[], ocurrencias: any[]) {
        if (actividades.length <= 0) {
            return;
        }
        var pdfContent: any = [];
        for (let i = 0; i < actividades.length; i++) {
            const actividad = actividades[i];
            actividad.estado = actividad.estado == 0 ? 'En proceso' : 'Completada';
            pdfContent.push([
                {
                    table: {
                        widths: ["*", "*", "*", "*"],
                        body: [
                            [
                                { text: "ID: " + actividad.id, style: "row_text", colSpan: 2 },
                                {},
                                { text: "Nombre: " + actividad.name, style: "row_text", colSpan: 2 },
                                {},
                            ],
                            [
                                { text: "Importancia: " + actividad.importancia, style: "row_text", colSpan: 2 },
                                {},
                                { text: "Área: " + actividad.area, style: "row_text", colSpan: 2 },
                                {},
                            ],
                            [
                                { text: "Fecha de Inicio: " + actividad.fecha_inicio, style: "row_text", colSpan: 2 },
                                {},
                                { text: "Fecha de Fin: " + actividad.fecha_fin, style: "row_text", colSpan: 2 },
                                {},
                            ],
                            [
                                { text: "Fecha de Registro: " + this.datePipe.transform(actividad.fecha_registro, 'dd/MM/yyyy'), style: "row_text", colSpan: 2 },
                                {},
                                { text: "Estado: " + actividad.estado, style: "row_text", colSpan: 2 },
                                {},
                            ],
                            [
                                { text: "Registrado por: " + actividad.registed_by, style: "row_text", colSpan: 4 },
                                {},
                                {},
                                {},
                            ],
                        ],
                    },
                    layout: {
                        fillColor: function (rowIndex: any, node: any, columnIndex: any) {
                            if (rowIndex % 2 == 0) {
                                return "#F8F8F8";
                            } else {
                                return "#FFFFFF";
                            }
                        },
                    },
                },
                {
                    text: " ",
                    pageBreak: '',
                },
            ]);
            
        }

        for (let i = 0; i < subactividades.length; i++) {
            const subactividad = subactividades[i];
            subactividad.estado = subactividad.estado == 0 ? 'En proceso' : 'Completada';
            pdfContent.push([
                {
                    table: {
                        widths: ["*", "*", "*", "*"],
                        body: [
                            [
                                { text: "ID: " + subactividad.id, style: "row_text", colSpan: 2 },
                                {},
                                { text: "ID Actividad: " + subactividad.actividad_code, style: "row_text", colSpan: 2 },
                                {},
                            ],
                            [
                                { text: "Cantidad de Ocurrencias: " + subactividad.cant_ocurrencias, style: "row_text", colSpan: 2 },
                                {},
                                { text: "Nombre: " + subactividad.name, style: "row_text", colSpan: 2 },
                                {},
                            ],
                            [
                                { text: "Fecha de Inicio: " + subactividad.fecha_inicio, style: "row_text", colSpan: 2 },
                                {},
                                { text: "Fecha de Fin: " + subactividad.fecha_fin, style: "row_text", colSpan: 2 },
                                {},
                            ],
                            [
                                { text: "Fecha de Registro: " + this.datePipe.transform(subactividad.fecha_registro, 'dd/MM/yyyy'), style: "row_text", colSpan: 2 },
                                {},
                                { text: "Estado: " + subactividad.estado, style: "row_text", colSpan: 2 },
                                {},
                            ],
                            [
                                { text: "Registrado por: " + subactividad.registed_by, style: "row_text", colSpan: 4 },
                                {},
                                {},
                                {},
                            ],
                        ],
                    },
                    layout: {
                        fillColor: function (rowIndex: any, node: any, columnIndex: any) {
                            if (rowIndex % 2 == 0) {
                                return "#DEFEFF";
                            } else {
                                return "#BDECED";
                            }
                        },
                    },
                },
                {
                    text: " ",
                    pageBreak: '',
                },
            ]);
            
        }

        for (let i = 0; i < ocurrencias.length; i++) {
            const ocurrencia = ocurrencias[i];
            ocurrencia.resuelta = ocurrencia.resuelta == 0 ? 'Pendiente' : 'Resuelta';
            pdfContent.push([
                {
                    table: {
                        widths: ["*", "*", "*", "*"],
                        body: [
                            [
                                { text: "ID: " + ocurrencia.id, style: "row_text", colSpan: 2 },
                                {},
                                { text: "ID Actividad: " + ocurrencia.actividad_code, style: "row_text", colSpan: 2 },
                                {},
                            ],
                            [
                                { text: "ID Subactividad: " + ocurrencia.subactividad_code, style: "row_text", colSpan: 2 },
                                {},
                                { text: "Nombre: " + ocurrencia.name, style: "row_text", colSpan: 2 },
                                {},
                            ],
                            [
                                { text: "Fecha de Registro: " + this.datePipe.transform(ocurrencia.fecha_registro, 'dd/MM/yyyy'), style: "row_text", colSpan: 2 },
                                {},
                                { text: "Resuelta: " + ocurrencia.resuelta, style: "row_text", colSpan: 2 },
                                {},
                            ],
                            [
                                { text: "Detalles: " + ocurrencia.detalles, style: "row_text", colSpan: 4 },
                                {},
                                {},
                                {},
                            ],
                            [
                                { text: "Registrado por: " + ocurrencia.registed_by, style: "row_text", colSpan: 4 },
                                {},
                                {},
                                {},
                            ],
                        ],
                    },
                    layout: {
                        fillColor: function (rowIndex: any, node: any, columnIndex: any) {
                            if (rowIndex % 2 == 0) {
                                return "#FFEEA6";
                            } else {
                                return "#EDE4BD";
                            }
                        },
                    },
                },
                {
                    text: " ",
                    pageBreak: '',
                },
            ]);
            
        }

        const docDefinition = {
            pageSize: "A4",
            content: pdfContent,
            styles: styles,
            pageMargins: [40, 80, 40, 60],
            header: [
                {
                    text: "REPORTE",
                    fontSize: 12,
                    margin: [40, 30, 0, 0]
                }
            ],
            footer: function (currentPage: any, pageCount: any) {
                return {
                    columns: [
                        { text: `Página ${currentPage} / ${pageCount}`, alignment: "right", style: "row_text" },
                    ],
                    margin: [40, 0, 40, 0]
                };
            }
        };

        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        pdfDocGenerator.getBlob((blob: Blob) => {
            fs.saveAs(blob, "Reporte_" + Date.now() + ".pdf");
        });
    }
}
