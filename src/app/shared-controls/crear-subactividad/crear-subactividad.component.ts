import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subactividad } from 'src/app/models/subactividad.model';
import { SubactividadService } from 'src/app/services/subactividad.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-crear-subactividad',
  templateUrl: './crear-subactividad.component.html',
  styleUrls: ['./crear-subactividad.component.css']
})
export class CrearSubactividadComponent {
  subactividad: Subactividad = new Subactividad();
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CrearSubactividadComponent>,
    private subactividad_service: SubactividadService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async crearSubctividad() {
    this.loading = true;
    this.subactividad.id = uuid.v4();
    this.subactividad.actividad_code = this.data.id;
    this.subactividad.fecha_registro = new Date().toString();
    var user = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.subactividad.registed_by = user.name;
    await this.save(this.subactividad);
    this.loading = false;
    this.dialogRef.close({ status: 'success', data: this.subactividad });
  }

  cancelar() {
    this.dialogRef.close({ status: 'cancel' });
  }

  async save(subactividad: any) {
    await this.subactividad_service.save(subactividad).subscribe((res: any) => {
      console.log(res);
    });
  }
}
