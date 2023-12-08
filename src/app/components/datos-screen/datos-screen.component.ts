import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { AreaService } from 'src/app/services/area.service';

interface AreaNode {
  id: string,
  name: string;
  children?: AreaNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-datos-screen',
  templateUrl: './datos-screen.component.html',
  styleUrls: ['./datos-screen.component.css']
})
export class DatosScreenComponent implements OnInit {

  mockData: string[] = [
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
  userType: string = '';
  area: string = '';

  private _transformer = (node: AreaNode, level: number) => {
    return {
      expandable: false,
      id: node.id,
      name: node.name,
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
    private areaService: AreaService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.userType = user.rol;
    this.list();
  }

  list() {
    this.areaService.list().subscribe((res: any) => {
      var adData = res.data;
      const new_data = [];
      for (const area of adData) {
        new_data.push(
          {
            id: area.id,
            name: area.name
          }
        );
      }
      this.dataSource.data = [...new_data];
    });
  }

  async guardarIterado(name: string) {
    await this.save({ name });
  }

  async guardar() {
    await this.save({ name: this.area });
    this._snackBar.open("El área fue registrada correctamente.", "Aceptar", { duration: 3000 });
  }

  async save(area: any) {
    await this.areaService.save(area).subscribe((res: any) => {
      console.log(res);
      this.area = '';
      this.list();
    });
  }

  async borrar(area: any) {
    await this.delete(area);
  }

  async delete(area: any) {
    await this.areaService.delete(area.id).subscribe((res: any) => {
      console.log(res);
      this.list();
    });
  }

  async llenar(){
    if (this.dataSource.data.length > 0) {
      return;
    }
    for(const d of this.mockData){
      await this.guardarIterado(d);
    }
    this.dataSource.data = [...this.dataSource.data,];
    this.list();
  }

}
