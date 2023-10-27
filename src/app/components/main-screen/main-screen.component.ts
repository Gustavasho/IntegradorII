import { Component } from '@angular/core';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent {
  sidenavExpanded: boolean = true;
  index_route: number = 0;
  rutaRecibida: string = '';

  recibirDatos(ruta: any) {
    console.log(ruta);
    this.selectRoute(ruta);
  }

  toggleSidenav() {
    this.sidenavExpanded = !this.sidenavExpanded;
  }

  selectRoute(index: number) {
    this.index_route = index;
  }
}
