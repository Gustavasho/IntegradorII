import { Component } from '@angular/core';
import { ActividadService } from 'src/app/services/actividad.service';
import { OcurrenciaService } from 'src/app/services/ocurrencia.service';
import { PdfReporteService } from 'src/app/services/pdf_reporte.service';
import { SubactividadService } from 'src/app/services/subactividad.service';

@Component({
  selector: 'app-reportes-screen',
  templateUrl: './reportes-screen.component.html',
  styleUrls: ['./reportes-screen.component.css']
})
export class ReportesScreenComponent {

  constructor(
    private pdf_report: PdfReporteService,
    private actividad_service: ActividadService,
    private subactividad_service: SubactividadService,
    private ocurrencia_service: OcurrenciaService,
  ) { }

  reporte() {
    var actividades: any[] = [];
    var subactividades: any[] = [];
    var ocurrencias: any[] = [];
    this.actividad_service.list().subscribe((res: any) => {
      actividades = res.data;
      this.subactividad_service.list().subscribe((res: any) => {
        subactividades = res.data;
        this.ocurrencia_service.list().subscribe((res: any) => {
          ocurrencias = res.data;
          this.pdf_report.generatePdf(actividades, subactividades, ocurrencias).then((r: any) => {
            console.log(r);
          });
        });
      });
    });
  }
}
