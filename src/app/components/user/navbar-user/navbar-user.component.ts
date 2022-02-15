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

  usuario: UsuarioModel = new UsuarioModel;

  constructor(private usuarioService:UsuarioService, private router:Router) {
    this.getUsuario();
   }

  ngOnInit(): void {
    
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
