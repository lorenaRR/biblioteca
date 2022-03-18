import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/shared/login/login.component';
import { GestionUsuariosComponent } from './components/admin/gestion-usuarios/gestion-usuarios.component';
import { MisLibrosComponent } from './components/user/mis-libros/mis-libros.component';
import { UserComponent } from './components/user/user/user.component';
import { CatalogoComponent } from './components/user/catalogo/catalogo.component';
import { GestionLibrosComponent } from './components/admin/gestion-libros/gestion-libros.component';
import { LibroCatalogoComponent } from './components/user/libro-catalogo/libro-catalogo.component';
import { NuevoComponent } from './components/admin/nuevo/nuevo.component';
import { InformesComponent } from './components/admin/informes/informes.component';
import { PrestamosComponent } from './components/admin/prestamos/prestamos.component';
import { ActualizarComponent } from './components/admin/actualizar/actualizar.component';
import { NuevoLibroComponent } from './components/admin/nuevo-libro/nuevo-libro.component';
import { ActualizarLibroComponent } from './components/admin/actualizar-libro/actualizar-libro.component';
import { DevolucionesComponent } from './components/admin/devoluciones/devoluciones.component';
import { ReservasComponent } from './components/admin/reservas/reservas.component';

const routes: Routes = [
  {path:'login', component: LoginComponent },
  {path:'gestion-usuarios', component: GestionUsuariosComponent },
  {path:'nuevo', component: NuevoComponent },
  {path:'actualizar/:id', component: ActualizarComponent },
  {path:'gestion-libros', component: GestionLibrosComponent },
  {path:'nuevo-libro', component: NuevoLibroComponent },
  {path:'actualizar-libro/:id', component: ActualizarLibroComponent },
  {path:'devoluciones', component: DevolucionesComponent },
  {path:'reservas', component: ReservasComponent },
  {path:'informes', component: InformesComponent },
  {path:'prestamos/:id', component: PrestamosComponent },
  {path:'user', component: UserComponent },
  {path:'mis-libros', component: MisLibrosComponent },
  {path:'catalogo', component: CatalogoComponent },
  {path:'libro-catalogo/:id', component: LibroCatalogoComponent},
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path:'**', pathMatch:'full', redirectTo:'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
