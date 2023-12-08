import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Actividad } from 'src/app/models/actividad.model';
import { ActividadService } from 'src/app/services/actividad.service';
import { CrearActividadComponent } from '../crear-actividad/crear-actividad.component';

@Component({
  selector: 'app-modificar-actividad',
  templateUrl: './modificar-actividad.component.html',
  styleUrls: ['./modificar-actividad.component.css']
})
export class ModificarActividadComponent {
  niveles_importancia = ['Baja', 'Media', 'Alta'];
  loading: boolean = false;
  areasEmpresariales: string[] = [
    'Recursos Humanos',
    'Finanzas',
    'Ventas',
    'Marketing',
    'Producción',
    'Investigación y Desarrollo',
    'Servicio al Cliente',
    'Logística',
    'Calidad',
    'Tecnología de la Información (TI)',
    'Legal',
    'Compras',
    'Comunicaciones',
    'Administración General',
    'Gerencia General'
  ];

  constructor(
    public dialogRef: MatDialogRef<CrearActividadComponent>,
    private actividad_service: ActividadService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    console.log(data);
  }

  cancelar() {
    this.dialogRef.close({ status: 'cancel' });
  }

  async update(actividad: any) {
    await this.actividad_service.update(actividad.id, actividad).subscribe((res: any) => {
      this.dialogRef.close({ status: 'success' });
    });
  }
}
