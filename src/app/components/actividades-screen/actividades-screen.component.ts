import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearActividadComponent } from 'src/app/shared-controls/crear-actividad/crear-actividad.component';

@Component({
  selector: 'app-actividades-screen',
  templateUrl: './actividades-screen.component.html',
  styleUrls: ['./actividades-screen.component.css']
})
export class ActividadesScreenComponent {

  constructor( private $dlg: MatDialog ){}

  crearActividad() {
    const dialogRef = this.$dlg.open(CrearActividadComponent, {
      disableClose: true,
      data: ''
    });
    dialogRef.afterClosed().subscribe((res) => {
    });
  }
}
