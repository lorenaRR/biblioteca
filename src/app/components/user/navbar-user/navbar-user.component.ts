import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../models/usuarios.model';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {

  public user!:UsuarioModel;

  constructor(private usuarioService:UsuarioService, private router:Router) { }

  ngOnInit(): void {
    this.user=this.usuarioService.currentUser;
  }

  salir(){
    console.log(this.usuarioService.currentUser);
    this.usuarioService.currentUser=new UsuarioModel;
    this.router.navigate(['/login']);
    console.log(this.usuarioService.currentUser);
  }

}
