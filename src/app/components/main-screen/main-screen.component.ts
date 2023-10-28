import { Component } from '@angular/core';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent {
  sidenavExpanded: boolean = true;
  index_route: number = 1;
  rutaRecibida: string = '';
  rutas: any[] = [
    { name: 'Inicio', icon: 'home' },
    { name: 'Actividades', icon: 'article' },
    { name: 'Ocurrencias', icon: 'announcement' },
    { name: 'Reportes', icon: 'analytics' },
    { name: 'Datos de la empresa', icon: 'dashboard' }
  ];

  recibirDatos(ruta: any) {
    this.selectRoute(ruta);
  }

  toggleSidenav() {
    this.sidenavExpanded = !this.sidenavExpanded;
  }

  selectRoute(index: number) {
    this.index_route = index;
  }
}
