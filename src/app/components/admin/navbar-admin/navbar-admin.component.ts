import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../models/usuarios.model';
import { UsuarioService } from '../../../services/usuario.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  public user!:UsuarioModel;
  forma!:FormGroup;

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
