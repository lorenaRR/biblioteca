import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioModel } from '../../../models/usuarios.model';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  forma!: FormGroup;
 
  constructor(private formBuilder:FormBuilder, private usuarioService:UsuarioService) {
      this.crearFormulario();
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

  crearFormulario(){
    this.forma=this.formBuilder.group({
        nombre:[''], 
        apellidos:[''],
        dni:[''], 
        direccion:[''], 
        telefono:[''], 
        email:[''],
        });
  }

  guardarFormulario(){

    console.log('prueba');

    console.log(this.forma);

    let usuarioNuevo: UsuarioModel = this.forma.value;

    usuarioNuevo.password=this.forma.controls.email.value;
    usuarioNuevo.usuario=this.forma.controls.dni.value;
    usuarioNuevo.admin=false;

    console.log(usuarioNuevo);

    this.usuarioService.postUsuario(this.forma.controls.dni.value, usuarioNuevo)
      .subscribe((resp:any)=>{
        console.log(resp.Estado);
      }) ;

    if(this.forma.invalid){
      Object.values(this.forma.controls).forEach(control=>{
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control=> control.markAsTouched());
        }
       control.markAsTouched();
      });
      return;
    }
    this.forma.reset();
    
    
  }
}
