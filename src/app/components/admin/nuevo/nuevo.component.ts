import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  /*get nombreNoValido(){
    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched;
  }
  get apellidosNoValido(){
    return this.forma.get('apellidos')?.invalid && this.forma.get('apellidos')?.touched;
  }
  get dniNoValido(){
    return this.forma.get('dni')?.invalid && this.forma.get('dni')?.touched;
  }
  get direccionNoValido(){
    return this.forma.get('direccion')?.invalid && this.forma.get('direccion')?.touched;
  }

  get telefonoNoValido(){
    return this.forma.get('telefono')?.invalid && this.forma.get('telefono')?.touched;

  }
  get emailNoValido(){
    return this.forma.get('email')?.invalid && this.forma.get('email')?.touched;
  }*/

  guardarFormulario(){
 
    this.usuarioService.postUsuario(this.usuario.dni, this.usuario)
      .subscribe((resp:any)=>{
          swal(resp.Estado);
      }) ;
    
  }
}
