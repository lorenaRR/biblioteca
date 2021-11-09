import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/shared/login/login.component';
import { GestionUsuariosComponent } from './components/admin/gestion-usuarios/gestion-usuarios.component';
import { MisLibrosComponent } from './components/user/mis-libros/mis-libros.component';
import { AdminComponent } from './components/admin/admin/admin.component';

import { UserComponent } from './components/user/user/user.component';
import { NavbarUserComponent } from './components/user/navbar-user/navbar-user.component';
import { NavbarAdminComponent } from './components/admin/navbar-admin/navbar-admin.component';
import { CatalogoComponent } from './components/user/catalogo/catalogo.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GestionUsuariosComponent,
    MisLibrosComponent,
    AdminComponent,
    UserComponent,
    NavbarUserComponent,
    NavbarAdminComponent,
    CatalogoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
