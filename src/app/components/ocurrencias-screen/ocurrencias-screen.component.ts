import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Actividad } from 'src/app/models/actividad.model';
import { Ocurrencia } from 'src/app/models/ocurrencia.model';
import { Subactividad } from 'src/app/models/subactividad.model';
import { User } from 'src/app/models/user.model';
import { ActividadService } from 'src/app/services/actividad.service';
import { OcurrenciaService } from 'src/app/services/ocurrencia.service';
import { SubactividadService } from 'src/app/services/subactividad.service';
import { CrearOcurrenciaComponent } from 'src/app/shared-controls/crear-ocurrencia/crear-ocurrencia.component';
import { DetailsComponent } from 'src/app/shared-controls/details/details.component';
import { ModificarOcurrenciaComponent } from 'src/app/shared-controls/modificar-ocurrencia/modificar-ocurrencia.component';

interface OcurrenciaNode {
  id: string,
  name: string;
  fecha: string;
  actividad: string;
  subactividad: string;
  resuelta: number;
  children?: OcurrenciaNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-ocurrencias-screen',
  templateUrl: './ocurrencias-screen.component.html',
  styleUrls: ['./ocurrencias-screen.component.css']
})
export class OcurrenciasScreenComponent implements OnInit {
  user: User = new User();
  userType: string = '';
  actividades: Actividad[] = [];
  subactividades: Subactividad[] = [];
  subactividades_original: Subactividad[] = [];
  actividad_selected: Actividad = new Actividad();
  subactividad_selected: Subactividad = new Subactividad();
  ocurrencias: Ocurrencia[] = [];
  original_data: any[] = [];
  statuses = [
    { estado: 0, status: 'Pendiente' },
    { estado: 1, status: 'Resuelta' }
  ];

  private _transformer = (node: OcurrenciaNode, level: number) => {
    return {
      expandable: false,
      id: node.id,
      name: node.name,
      fecha: node.fecha,
      actividad: node.actividad,
      subactividad: node.subactividad,
      resuelta: node.resuelta,
      level: level,
    };
  };

  treeControl: any = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener: any = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  constructor(
    private actividad_service: ActividadService,
    private subactividad_service: SubactividadService,
    private ocurrencia_service: OcurrenciaService,
    private $dlg: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.userType = this.user.rol;
    this.list();
  }

  async list() {
    await this.actividad_service.list().subscribe((r: any) => {
      this.actividades = r.data.filter((item: any) => item.area === this.user.area);
      this.actividad_selected = new Actividad();
    });
    await this.subactividad_service.list().subscribe((r: any) => {
      this.subactividades = r.data;
      this.subactividades_original = r.data;
      this.subactividad_selected = new Subactividad();
    });
    await this.ocurrencia_service.list().subscribe((r: any) => {
      this.ocurrencias = r.data;
      const new_data = [];
      for (const ocurrencia of r.data) {
        new_data.push(
          {
            id: ocurrencia.id,
            name: ocurrencia.name,
            fecha: ocurrencia.fecha_registro,
            subactividad: ocurrencia.subactividad_code,
            actividad: ocurrencia.actividad_code,
            resuelta: ocurrencia.resuelta
          }
        );
      }
      this.dataSource.data = [...new_data.sort((a: any, b: any) => a.resuelta - b.resuelta)];
      this.original_data = [...this.dataSource.data];
    });
  }

  async listOcurr() {
    await this.ocurrencia_service.list().subscribe((r: any) => {
      this.ocurrencias = r.data;
      const new_data = [];
      for (const ocurrencia of r.data) {
        new_data.push(
          {
            id: ocurrencia.id,
            name: ocurrencia.name,
            fecha: ocurrencia.fecha_registro,
            subactividad: ocurrencia.subactividad_code,
            actividad: ocurrencia.actividad_code,
            resuelta: ocurrencia.resuelta
          }
        );
      }
      this.dataSource.data = [...new_data];
      this.original_data = [...this.dataSource.data];
      this.filtrarOcurrencias();
    });
  }

  filtrarSubactividades() {
    this.subactividad_selected = new Subactividad();
    this.subactividades = this.subactividades_original.filter((item: any) => item.actividad_code === this.actividad_selected.id);
  }

  filtrarOcurrencias() {
    if (this.subactividad_selected.id != '') {
      this.dataSource.data = this.original_data.filter((item: any) => item.subactividad === this.subactividad_selected.id);
    }
    this.dataSource.data = [...this.dataSource.data.sort((a: any, b: any) => a.resuelta - b.resuelta)];
  }

  crearOcurrencia() {
    const dialogRef = this.$dlg.open(CrearOcurrenciaComponent, {
      disableClose: true,
      data: {
        idS: this.subactividad_selected.id,
        idA: this.actividad_selected.id,
        name: this.subactividad_selected.name,
        subactividad: this.subactividad_selected,
      }
    });
    dialogRef.afterClosed().subscribe(async (res) => {
      if (res.status == 'success') {
        this.listOcurr();
        this._snackBar.open("La ocurrencia fue registrada correctamente.", "Aceptar", { duration: 3000 });
      }
    });
  }

  async changeStatus(node: any) {
    const ocurr = this.ocurrencias.filter((item: any) => item.id === node.id);
    ocurr[0].resuelta = node.resuelta == 0 ? 1 : 0;
    await this.update(ocurr[0]);
  }

  async update(ocurrencia: Ocurrencia) {
    await this.ocurrencia_service.update(ocurrencia.id, ocurrencia).subscribe((res: any) => {
      this.listOcurr();
    });
  }

  detalles(node: any) {
    var object = {};
    this.ocurrencias.map((s: any) => {
      if (s.id == node.id) {
        object = s;
      }
    });
    this.$dlg.open(DetailsComponent, {
      width: '500px',
      height: '440px',
      data: object
    });
  }

  modificarOcurrencia(node: any){
    var object = {};
    this.ocurrencias.map((s: any) => {
      if (s.id == node.id) {
        object = s;
        const dialogRef = this.$dlg.open(ModificarOcurrenciaComponent, {
          disableClose: true,
          data: object
        });
        dialogRef.afterClosed().subscribe(async (res) => {
          if (res.status == 'success') {
            this.listOcurr();
            this._snackBar.open("La ocurrencia fue modificada correctamente.", "Aceptar", { duration: 3000 });
          }
        });
      }
    });
    
  }

  async deleteo(ocurrencia: any) {
    await this.ocurrencia_service.delete(ocurrencia.id).subscribe((res: any) => {
      console.log(res);
      this.listOcurr();
    });
  }

  reiniciarFiltro() {
    this.list();
  }

  ordenarPendiente() {

  }

}
