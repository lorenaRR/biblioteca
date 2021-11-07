import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/shared/login/login.component';
import { GestionUsuariosComponent } from './components/admin/gestion-usuarios/gestion-usuarios.component';
import { MisLibrosComponent } from './components/user/mis-libros/mis-libros.component';

const routes: Routes = [
  {path:'login', component: LoginComponent },
  {path:'gestion-usuarios', component: GestionUsuariosComponent },
  {path:'mis-libros', component: MisLibrosComponent },
  {path:'**', pathMatch:'full', redirectTo:'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
