import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioModel } from '../../../models/usuarios.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  usuario:UsuarioModel = new UsuarioModel;
  dniNoValido = false;
  adminNoValido = false;
  emailNoValido = false;
  constructor(private usuarioService:UsuarioService) {

  }


  ngOnInit(): void {
    
  }


  guardarFormulario(){


    if(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(this.usuario.email)){
      this.emailNoValido=false;
    }
    else{
      this.emailNoValido=true;
      swal("El e-mail no es correcto");
    }

    if(this.usuario.dni ==null || this.usuario.dni ==""){
      this.dniNoValido=true;
      swal("El DNI es obligatorio.");
    }
    else{
      this.dniNoValido=false;
    }

    if(this.usuario.admin !=null){
      this.adminNoValido=false;
    }
    else{
      this.adminNoValido=true;
      swal("El tipo de usuario es obligatorio.");

    }
    
    if (!this.dniNoValido && !this.emailNoValido && !this.adminNoValido){
      this.usuarioService.postUsuario(this.usuario.dni, this.usuario)
      .subscribe((resp:any)=>{
          swal(resp.Estado);
          this.usuario = new UsuarioModel;
      }) ;
    }
  }
}
