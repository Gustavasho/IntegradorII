import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AreaService } from 'src/app/services/area.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.css']
})
export class RegisterScreenComponent {
  user: User = new User();
  password: string = '';
  showPassword: boolean = false;
  loading: boolean = false;
  areasEmpresariales: string[] = [];
  areasEmpresarialesOriginal: string[] = [];
  roles: string[] = [
    'Administrador',
    'Usuario'
  ];

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private user_service: UserService,
    private areaService: AreaService,
  ) { }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.areaService.list().subscribe((res: any) => {
      var adData = res.data;
      for (const area of adData) {
        this.areasEmpresariales.push(area.name);
      }
      this.areasEmpresariales = [...this.areasEmpresariales];
      this.areasEmpresarialesOriginal = [...this.areasEmpresariales];
    });
  }

  cambiarArea() {
    if (this.user.rol == 'Usuario') {
      this.areasEmpresariales = this.areasEmpresarialesOriginal;
      return;
    }
    this.areasEmpresariales = [];
    this.user.area = "";
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async register() {
    this.loading = true;
    if (this.user.password != this.password) {
      this._snackBar.open("Contraseñas deben coincidir.", "Aceptar", { duration: 3000 });
      this.loading = false;
      return;
    }
    await this.save(this.user);
    this.loading = false;
    this.router.navigate(['/']);
    this._snackBar.open("Usuario registrado correctamente.", "Aceptar", { duration: 3000 });
  }

  async save(user: any) {
    await this.user_service.save(user).subscribe((res: any) => {
      console.log(res);
    });
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
