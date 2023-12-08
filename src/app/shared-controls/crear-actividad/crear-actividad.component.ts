import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActividadService } from 'src/app/services/actividad.service';
import * as uuid from 'uuid';
import { Actividad } from 'src/app/models/actividad.model';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent implements OnInit {
  actividad: Actividad = new Actividad();
  niveles_importancia = ['Baja', 'Media', 'Alta'];
  loading: boolean = false;
  areasEmpresariales: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<CrearActividadComponent>,
    private actividad_service: ActividadService,
    private areaService: AreaService,
  ) { }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.areaService.list().subscribe((res: any) => {
      var adData = res.data;
      for (const area of adData) {
        this.areasEmpresariales.push(area.name);
      }
      this.areasEmpresariales = [...this.areasEmpresariales];
    });
  }

  async crearActividad() {
    this.loading = true;
    this.actividad.id = uuid.v4();
    this.actividad.fecha_registro = new Date().toString();
    var user = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.actividad.registed_by = user.name;
    await this.save(this.actividad);
    this.loading = false;
    this.dialogRef.close({ status: 'success', data: this.actividad });
  }

  cancelar() {
    this.dialogRef.close({ status: 'cancel' });
  }

  async save(actividad: any) {
    await this.actividad_service.save(actividad).subscribe((res: any) => {
      console.log(res);
    });
  }

}
