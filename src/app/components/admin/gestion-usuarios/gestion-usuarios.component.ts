import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioModel } from '../../../models/usuarios.model';
import swal from 'sweetalert';


@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styles: [
  ]
})
export class GestionUsuariosComponent implements OnInit {

  usuarios!: UsuarioModel[];
  dni!: string;
  nombre!: string;
  apellidos!: string;
  admin='99';
 
  constructor( private usuarioService:UsuarioService) {
      
   }


  ngOnInit(): void {
  }


  verUsuario(){

    if(this.dni==null){
      this.dni="";
    }
    if(this.nombre==null){
      this.nombre="";
    }
    if(this.apellidos==null){
      this.apellidos="";
    }

   
    this.usuarioService.getUsuario(this.dni, this.nombre,this.apellidos,this.admin)
      .subscribe(resp=>{
        this.usuarios = resp;
      })
  }

  borrarUsuario(dni:string){
    this.usuarioService.deleteUsuario(dni)
      .subscribe((resp:any)=>{
        swal(resp.Estado);
        this.verUsuario();
      })
  }



}
