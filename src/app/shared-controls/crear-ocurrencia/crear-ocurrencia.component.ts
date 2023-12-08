import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ocurrencia } from 'src/app/models/ocurrencia.model';
import { Subactividad } from 'src/app/models/subactividad.model';
import { OcurrenciaService } from 'src/app/services/ocurrencia.service';
import { SubactividadService } from 'src/app/services/subactividad.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-crear-ocurrencia',
  templateUrl: './crear-ocurrencia.component.html',
  styleUrls: ['./crear-ocurrencia.component.css']
})
export class CrearOcurrenciaComponent {
  ocurrencia: Ocurrencia = new Ocurrencia();
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CrearOcurrenciaComponent>,
    private ocurrencia_service: OcurrenciaService,
    private subactividad_service: SubactividadService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async crearOcurrencia() {
    this.loading = true;
    this.ocurrencia.id = uuid.v4();
    this.ocurrencia.subactividad_code = this.data.idS;
    this.ocurrencia.actividad_code = this.data.idA;
    this.ocurrencia.fecha_registro = new Date().toString();
    this.ocurrencia.resuelta = 0;
    var user = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.ocurrencia.registed_by = user.name;
    await this.save(this.ocurrencia);
    this.data.subactividad.cant_ocurrencias++;
    await this.update(this.data.subactividad);
    this.loading = false;
    this.dialogRef.close({ status: 'success', data: this.ocurrencia });
  }

  cancelar() {
    this.dialogRef.close({ status: 'cancel' });
  }

  async save(ocurrencia: any) {
    await this.ocurrencia_service.save(ocurrencia).subscribe((res: any) => {
      console.log(res);
    });
  }

  async update(subactividad: Subactividad) {
    await this.subactividad_service.update(subactividad.id, subactividad).subscribe((res: any) => {
      console.log(res);
    });
  }
}
