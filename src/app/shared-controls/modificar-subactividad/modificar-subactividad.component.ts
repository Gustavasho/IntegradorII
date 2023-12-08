import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subactividad } from 'src/app/models/subactividad.model';
import { SubactividadService } from 'src/app/services/subactividad.service';
import { CrearSubactividadComponent } from '../crear-subactividad/crear-subactividad.component';

@Component({
  selector: 'app-modificar-subactividad',
  templateUrl: './modificar-subactividad.component.html',
  styleUrls: ['./modificar-subactividad.component.css']
})
export class ModificarSubactividadComponent {
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CrearSubactividadComponent>,
    private subactividad_service: SubactividadService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelar() {
    this.dialogRef.close({ status: 'cancel' });
  }

  async update(subactividad: any) {
    await this.subactividad_service.update(subactividad.id, subactividad).subscribe((res: any) => {
      this.dialogRef.close({ status: 'success' });
    });
  }
}
