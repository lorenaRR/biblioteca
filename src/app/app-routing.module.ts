import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/shared/login/login.component';
import { GestionUsuariosComponent } from './components/admin/gestion-usuarios/gestion-usuarios.component';
import { MisLibrosComponent } from './components/user/mis-libros/mis-libros.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { UserComponent } from './components/user/user/user.component';
import { CatalogoComponent } from './components/user/catalogo/catalogo.component';

const routes: Routes = [
  {path:'login', component: LoginComponent },
  {path:'gestion-usuarios', component: GestionUsuariosComponent },
  {path:'mis-libros', component: MisLibrosComponent },
  {path:'catalogo', component: CatalogoComponent },
  {path:'admin', component: AdminComponent },
  {path:'user', component: UserComponent },
  {path:'**', pathMatch:'full', redirectTo:'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
