import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { InicioScreenComponent } from './components/inicio-screen/inicio-screen.component';
import { ActividadesScreenComponent } from './components/actividades-screen/actividades-screen.component';
import { CrearActividadComponent } from './shared-controls/crear-actividad/crear-actividad.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTreeModule } from '@angular/material/tree';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { CrearSubactividadComponent } from './shared-controls/crear-subactividad/crear-subactividad.component';
import { OcurrenciasScreenComponent } from './components/ocurrencias-screen/ocurrencias-screen.component';
import { CrearOcurrenciaComponent } from './shared-controls/crear-ocurrencia/crear-ocurrencia.component';
import { RegisterScreenComponent } from './components/register-screen/register-screen.component';
import { DetailsComponent } from './shared-controls/details/details.component';
import { ModificarActividadComponent } from './shared-controls/modificar-actividad/modificar-actividad.component';
import { ModificarSubactividadComponent } from './shared-controls/modificar-subactividad/modificar-subactividad.component';
import { ModificarOcurrenciaComponent } from './shared-controls/modificar-ocurrencia/modificar-ocurrencia.component';
import { ReportesScreenComponent } from './components/reportes-screen/reportes-screen.component';
import { DatosScreenComponent } from './components/datos-screen/datos-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    MainScreenComponent,
    InicioScreenComponent,
    ActividadesScreenComponent,
    CrearActividadComponent,
    CrearSubactividadComponent,
    OcurrenciasScreenComponent,
    CrearOcurrenciaComponent,
    RegisterScreenComponent,
    DetailsComponent,
    ModificarActividadComponent,
    ModificarSubactividadComponent,
    ModificarOcurrenciaComponent,
    ReportesScreenComponent,
    DatosScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatDividerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSelectModule,
    MatTreeModule,
    MatSnackBarModule,
    HttpClientModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
