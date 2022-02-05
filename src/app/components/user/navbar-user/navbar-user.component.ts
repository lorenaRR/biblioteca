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
    //this.getUsuario();
   }

  ngOnInit(): void {
    
    this.usuario = this.usuarioService.currentUser;
  }

  salir(){
    console.log(this.usuarioService.currentUser);
    this.usuarioService.currentUser=new UsuarioModel;
    this.router.navigate(['/login']);
    console.log(this.usuarioService.currentUser);
  }

  getUsuario(){
    let id=localStorage.getItem("idUsuario");
    if (id!=null){
      this.usuarioService.getUsuario(id,'','','')
        .subscribe((resp:any)=>{
          this.usuario = resp;
          console.log(this.usuario);
        });
    }
  }

}
