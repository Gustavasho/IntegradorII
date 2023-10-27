import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-inicio-screen',
  templateUrl: './inicio-screen.component.html',
  styleUrls: ['./inicio-screen.component.css']
})
export class InicioScreenComponent {
  @Output() ruta = new EventEmitter<any>();

  selectRoute(route: number) {
    this.ruta.emit(route);
  }
}
