import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { InicioScreenComponent } from './components/inicio-screen/inicio-screen.component';
import { ActividadesScreenComponent } from './components/actividades-screen/actividades-screen.component';
import { RegisterScreenComponent } from './components/register-screen/register-screen.component';
import { ReportesScreenComponent } from './components/reportes-screen/reportes-screen.component';
import { DatosScreenComponent } from './components/datos-screen/datos-screen.component';

const routes: Routes = [
  { path: '', component: LoginScreenComponent },
  { path: 'main-screen', component: MainScreenComponent },
  { path: 'inicio-screen', component: InicioScreenComponent },
  { path: 'actividades-screen', component: ActividadesScreenComponent },
  { path: 'register-screen', component: RegisterScreenComponent },
  { path: 'reportes-screen', component: ReportesScreenComponent },
  { path: 'datos-screen', component: DatosScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
