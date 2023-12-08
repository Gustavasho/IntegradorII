import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subactividad } from 'src/app/models/subactividad.model';
import { OcurrenciaService } from 'src/app/services/ocurrencia.service';
import { SubactividadService } from 'src/app/services/subactividad.service';
import { CrearOcurrenciaComponent } from '../crear-ocurrencia/crear-ocurrencia.component';

@Component({
  selector: 'app-modificar-ocurrencia',
  templateUrl: './modificar-ocurrencia.component.html',
  styleUrls: ['./modificar-ocurrencia.component.css']
})
export class ModificarOcurrenciaComponent {
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CrearOcurrenciaComponent>,
    private ocurrencia_service: OcurrenciaService,
    private subactividad_service: SubactividadService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelar() {
    this.dialogRef.close({ status: 'cancel' });
  }

  async update(ocurrencia: any) {
    await this.ocurrencia_service.update(ocurrencia.id, ocurrencia).subscribe((res: any) => {
      this.dialogRef.close({ status: 'success' });
    });
  }
}
