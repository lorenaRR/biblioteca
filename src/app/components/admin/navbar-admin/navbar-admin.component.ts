import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../models/usuarios.model';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel;

  constructor(private usuarioService:UsuarioService, private router:Router) { }

  ngOnInit(): void {
    this.getUsuario();
  }

  salir(){
    localStorage.removeItem("isUsuario");
    this.router.navigate(['/login']);
  }

  getUsuario(){
    let id=localStorage.getItem("idUsuario");
    if (id!=null){
      this.usuarioService.getUsuario(id,'','','99')
        .subscribe((resp:any)=>{
          this.usuario = resp[0];
        });
    }
  }

}
