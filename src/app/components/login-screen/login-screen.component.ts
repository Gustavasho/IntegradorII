import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent {
  user: User = new User();
  showPassword: boolean = false;
  loading: boolean = false;

  constructor(
    private router: Router,
    private user_service: UserService,
    private _snackBar: MatSnackBar,
  ) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async login() {
    this.loading = true;
    await this.validate(this.user);
      this.loading = false;
  }

  async validate(user: any) {
    var tf = false;
    await this.user_service.list().subscribe((res: any) => {
      res.data.map((us: any) => {
        if (us.name == user.name) {
          if (us.password == user.password) {
            tf = true;
            localStorage.setItem('usuario', JSON.stringify(us));
            this.router.navigate(['/main-screen']);
            this._snackBar.open("Inicio de sesión exitoso.", "Aceptar", { duration: 3000 });
            return;
          }
        }
      });
      if (!tf) {
        this._snackBar.open("Usuario o contraseña incorrectos.", "Aceptar", { duration: 3000 });
      }
    });
  }

  register() {
    this.router.navigate(['/register-screen']);
  }

}
