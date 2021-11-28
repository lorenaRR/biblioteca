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
  formaUsu!: FormGroup;
 
  constructor(private formBuilder:FormBuilder, private usuarioService:UsuarioService) {
      this.crearFormulario();
      this.crearFormularioUsu();
   }


  ngOnInit(): void {
  }

  get nombreNoValido(){
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
  }
  
  crearFormulario(){
    this.forma=this.formBuilder.group({
        nombre:['', [Validators.required]], 
        apellidos:['',[Validators.required]],
        dni:['', [Validators.required]], 
        direccion:['', [Validators.required]], 
        telefono:['', [Validators.required]], 
        email:['',[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
        });
  }

  crearFormularioUsu(){
    this.formaUsu=this.formBuilder.group({
      dni2:['', [Validators.required]]
    })
  }

  guardarFormulario(){

    console.log(this.forma);

    let usuarioNuevo: UsuarioModel;

    usuarioNuevo = this.forma.value;

    usuarioNuevo.password=this.forma.controls.email.value;
    usuarioNuevo.usuario=this.forma.controls.dni.value;

    console.log(usuarioNuevo);

    this.usuarioService.usuarios.push(usuarioNuevo);

    console.log(this.usuarioService.usuarios);

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
