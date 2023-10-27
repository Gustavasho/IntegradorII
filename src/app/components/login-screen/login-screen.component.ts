import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent {
  user: string = '';
  password: string = '';
  showPassword: boolean = false;
  loading: boolean = false;

  constructor(private router: Router) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/main-screen']);
    }, 3000);
  }

}
