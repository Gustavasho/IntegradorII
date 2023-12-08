import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CrearActividadComponent } from 'src/app/shared-controls/crear-actividad/crear-actividad.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActividadService } from 'src/app/services/actividad.service';
import { CrearSubactividadComponent } from 'src/app/shared-controls/crear-subactividad/crear-subactividad.component';
import { SubactividadService } from 'src/app/services/subactividad.service';
import { Actividad } from 'src/app/models/actividad.model';
import { Subactividad } from 'src/app/models/subactividad.model';
import { DetailsComponent } from 'src/app/shared-controls/details/details.component';
import { ModificarActividadComponent } from 'src/app/shared-controls/modificar-actividad/modificar-actividad.component';
import { ModificarSubactividadComponent } from 'src/app/shared-controls/modificar-subactividad/modificar-subactividad.component';
import { OcurrenciaService } from 'src/app/services/ocurrencia.service';

interface ActividadNode {
  id: string,
  name: string;
  percent: number;
  estado: number;
  importancia: string;
  isActivity: boolean;
  children?: ActividadNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-actividades-screen',
  templateUrl: './actividades-screen.component.html',
  styleUrls: ['./actividades-screen.component.css']
})
export class ActividadesScreenComponent implements OnInit {
  userType: string = '';
  search: string = '';
  original_data: any[] = [];
  statuses = [
    { estado: 0, status: 'En Proceso' },
    { estado: 1, status: 'Completado' }
  ];
  filtro_importancia: string = 'Predeterminado';
  tipos_filtro = ['Predeterminado', /*'Fecha Ascendente', 'Fecha Descendente',*/ 'Prioridad Ascendente', 'Prioridad Descendente'];
  subactividades_list: Subactividad[] = [];
  actividades_list: Actividad[] = [];

  private _transformer = (node: ActividadNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      id: node.id,
      name: node.name,
      percent: node.percent,
      estado: node.estado,
      importancia: node.importancia,
      isActivity: node.isActivity,
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
    private $dlg: MatDialog,
    private _snackBar: MatSnackBar,
    private actividad_service: ActividadService,
    private subactividad_service: SubactividadService,
    private ocurrencia_service: OcurrenciaService,
  ) {
    this.dataSource.data = [];
  }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.userType = user.rol;
    console.log(this.userType);
    this.list();
  }

  crearSubactividad(node: any) {
    const dialogRef = this.$dlg.open(CrearSubactividadComponent, {
      disableClose: true,
      data: {
        id: node.id,
        name: node.name
      }
    });
    dialogRef.afterClosed().subscribe(async (res) => {
      if (res.status == 'success') {
        this.list();
        this._snackBar.open("La subactividad fue registrada correctamente.", "Aceptar", { duration: 3000 });
      }
    });
  }

  crearActividad() {
    const dialogRef = this.$dlg.open(CrearActividadComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(async (res) => {
      if (res.status == 'success') {
        this.list();
        this._snackBar.open("La actividad fue registrada correctamente.", "Aceptar", { duration: 3000 });
      }
    });
  }

  modificarActividad(node: any) {
    var object = {};
    if (node.isActivity) {
      this.actividades_list.map((a: any) => {
        if (a.id == node.id) {
          object = a;
          const dialogRef = this.$dlg.open(ModificarActividadComponent, {
            disableClose: true,
            data: object
          });
          dialogRef.afterClosed().subscribe(async (res) => {
            if (res.status == 'success') {
              this.list();
              this._snackBar.open("La actividad fue modificada correctamente.", "Aceptar", { duration: 3000 });
            }
          });
        }
      });
    } else {
      this.subactividades_list.map((s: any) => {
        if (s.id == node.id) {
          object = s;
          const dialogRef = this.$dlg.open(ModificarSubactividadComponent, {
            disableClose: true,
            data: object
          });
          dialogRef.afterClosed().subscribe(async (res) => {
            if (res.status == 'success') {
              this.list();
              this._snackBar.open("La subactividad fue modificada correctamente.", "Aceptar", { duration: 3000 });
            }
          });
        }
      });
    }

  }

  async list() {
    await this.actividad_service.list().subscribe(async (resp: any) => {
      var user = JSON.parse(localStorage.getItem('usuario') || '{}');
      this.actividades_list = resp.data;
      var adData = user.rol == 'Administrador' ? resp.data : resp.data.filter((item: any) => item.area === user.area);
      const new_data = [];
      for (const actividad of adData) {
        new_data.push(
          {
            id: actividad.id,
            name: actividad.name,
            percent: 0,
            estado: actividad.estado,
            importancia: actividad.importancia,
            isActivity: true
          }
        );
      }
      this.dataSource.data = [...new_data];
      this.original_data = [...this.dataSource.data];
      await this.subactividad_service.list().subscribe((res: any) => {
        this.subactividades_list = res.data;
        const subactividades = res.data;
        const actividades: any[] = this.dataSource.data;
        for (let i = 0; i < actividades.length; i++) {
          const subFiltered = subactividades.filter((item: any) => item.actividad_code === actividades[i].id);
          if (subFiltered.length > 0) {
            actividades[i].children = [];
            for (const sub of subFiltered) {
              actividades[i].children.push(
                {
                  id: sub.id,
                  name: sub.name,
                  percent: sub.cant_ocurrencias,
                  estado: sub.estado,
                  importancia: '',
                  isActivity: false
                }
              );
              actividades[i].percent += sub.estado == 1 ? 1 / subFiltered.length : 0;
            }
            console.log(actividades[i].percent);
            this.dataSource.data = [...actividades];
          }
        }
      });
    });
  }

  filtrar() {
    const importanciaMapping: { [key: string]: number } = {
      'Alta': 3,
      'Media': 2,
      'Baja': 1,
    };
    if (this.filtro_importancia == this.tipos_filtro[0]) {
      this.dataSource.data = [...this.original_data];
    }
    if (this.filtro_importancia == this.tipos_filtro[1]) {
      this.dataSource.data = this.dataSource.data.sort((a: any, b: any) => {
        const importanciaA = importanciaMapping[a.importancia];
        const importanciaB = importanciaMapping[b.importancia];
        return importanciaA - importanciaB;
      });
    }
    if (this.filtro_importancia == this.tipos_filtro[2]) {
      this.dataSource.data = this.dataSource.data.sort((a: any, b: any) => {
        const importanciaA = importanciaMapping[a.importancia];
        const importanciaB = importanciaMapping[b.importancia];
        return importanciaB - importanciaA;
      });
    }
  }

  filtrarPorNombre() {
    const filtered = this.original_data.filter((item: any) => item.name.includes(this.search));
    this.dataSource.data = [...filtered];
  }

  async changeStatus(node: any) {
    if (node.isActivity) {
      const act = this.actividades_list.filter((item: any) => item.id === node.id);
      act[0].estado = node.estado == 0 ? 1 : 0;
      await this.update2(act[0]);
    } else {
      const subact = this.subactividades_list.filter((item: any) => item.id === node.id);
      subact[0].estado = node.estado == 0 ? 1 : 0;
      await this.update(subact[0]);
    }
  }

  async update(subactividad: Subactividad) {
    await this.subactividad_service.update(subactividad.id, subactividad).subscribe((res: any) => {
      console.log(res);
      this.list();
    });
  }

  async update2(actividad: Actividad) {
    await this.actividad_service.update(actividad.id, actividad).subscribe((res: any) => {
      console.log(res);
      this.list();
    });
  }

  openDetails(node: any) {
    var object = {};
    var width = '';
    var height = '';
    if (node.isActivity) {
      this.actividades_list.map((a: any) => {
        if (a.id == node.id) {
          object = a;
          width = '420px';
          height = '500px';
        }
      });
    } else {
      this.subactividades_list.map((s: any) => {
        if (s.id == node.id) {
          object = s;
          width = '500px';
          height = '500px';
        }
      });
    }
    this.$dlg.open(DetailsComponent, {
      width,
      height,
      data: object
    });
  }

  async eliminarActividad(node: any) {
    if (node.isActivity) {
      await this.actividad_service.delete(node.id).subscribe((res: any) => {
        var ocrrncs = [];
        this.ocurrencia_service.list().subscribe((resp: any) => {
          ocrrncs = resp.data.filter((i: any) => i.actividad_code === node.id);
          ocrrncs.map(async (o: any) => {
            await this.deleteo(o);
          });
        });
        this.list();
      });
    } else {
      await this.subactividad_service.delete(node.id).subscribe((res: any) => {
        var ocrrncs = [];
        this.ocurrencia_service.list().subscribe((resp: any) => {
          ocrrncs = resp.data.filter((i: any) => i.subactividad_code === node.id);
          ocrrncs.map(async (o: any) => {
            await this.deleteo(o);
          });
        });
        this.list();
      });
    }
  }

  async deleteo(ocurrencia: any) {
    await this.ocurrencia_service.delete(ocurrencia.id).subscribe((res: any) => {
      console.log(res);
    });
  }

}
