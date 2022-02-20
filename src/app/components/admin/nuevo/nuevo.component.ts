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

  constructor(private usuarioService:UsuarioService) {

  }


  ngOnInit(): void {
    
  }

  guardarFormulario(){
    if (this.usuario.dni !=null && this.usuario.email !=null && this.usuario.admin != null){
      this.usuarioService.postUsuario(this.usuario.dni, this.usuario)
      .subscribe((resp:any)=>{
          swal(resp.Estado);
          this.usuario = new UsuarioModel;
      }) ;
    }
    else{
      swal("El campo tipo de usuario, DNI y E-mail son obligatorios");
    }
    
  }
}
