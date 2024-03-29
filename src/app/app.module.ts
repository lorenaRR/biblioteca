import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/shared/login/login.component';
import { GestionUsuariosComponent } from './components/admin/gestion-usuarios/gestion-usuarios.component';
import { MisLibrosComponent } from './components/user/mis-libros/mis-libros.component';

import { UserComponent } from './components/user/user/user.component';
import { NavbarUserComponent } from './components/user/navbar-user/navbar-user.component';
import { NavbarAdminComponent } from './components/admin/navbar-admin/navbar-admin.component';
import { CatalogoComponent } from './components/user/catalogo/catalogo.component';
import { PipesModule } from './pipes/pipes.module';
import { GestionLibrosComponent } from './components/admin/gestion-libros/gestion-libros.component';
import { LibroCatalogoComponent } from './components/user/libro-catalogo/libro-catalogo.component';
import { NuevoComponent } from './components/admin/nuevo/nuevo.component';
import { InformesComponent } from './components/admin/informes/informes.component';
import { PrestamosComponent } from './components/admin/prestamos/prestamos.component';
import { ActualizarComponent } from './components/admin/actualizar/actualizar.component';
import { NuevoLibroComponent } from './components/admin/nuevo-libro/nuevo-libro.component';
import { ActualizarLibroComponent } from './components/admin/actualizar-libro/actualizar-libro.component';
import { CategoriasComponent } from './components/modals/categorias/categorias.component';
import { AutoresComponent } from './components/modals/autores/autores.component';
import { DevolucionesComponent } from './components/admin/devoluciones/devoluciones.component';
import { ReservasComponent } from './components/admin/reservas/reservas.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GestionUsuariosComponent,
    MisLibrosComponent,
    UserComponent,
    NavbarUserComponent,
    NavbarAdminComponent,
    CatalogoComponent,
    GestionLibrosComponent,
    LibroCatalogoComponent,
    NuevoComponent,
    InformesComponent,
    PrestamosComponent,
    ActualizarComponent,
    NuevoLibroComponent,
    ActualizarLibroComponent,
    CategoriasComponent,
    AutoresComponent,
    DevolucionesComponent,
    ReservasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
