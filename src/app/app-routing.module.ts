import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { InicioScreenComponent } from './components/inicio-screen/inicio-screen.component';
import { ActividadesScreenComponent } from './components/actividades-screen/actividades-screen.component';

const routes: Routes = [
  { path: '', component: LoginScreenComponent },
  { path: 'main-screen', component: MainScreenComponent },
  { path: 'inicio-screen', component: InicioScreenComponent },
  { path: 'actividades-screen', component: ActividadesScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
