import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioModel } from '../../../models/usuarios.model';


@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styles: [
  ]
})
export class GestionUsuariosComponent implements OnInit {


  forma!: FormGroup;
 
  constructor(private formBuilder:FormBuilder, private usuarioService:UsuarioService) {
      this.crearFormulario();
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
  get calleNoValido(){
    return this.forma.get('direccion.calle')?.invalid && this.forma.get('direccion.calle')?.touched;
  }
  get ciudadNoValido(){
    return this.forma.get('direccion.ciudad')?.invalid && this.forma.get('direccion.ciudad')?.touched;
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
        direccion:this.formBuilder.group({
          calle:['',Validators.required],
          ciudad:['',Validators.required]
        }),
        telefono:['', [Validators.required]], 
        email:['',[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
        });
  }

  guardarFormulario(){

    console.log(this.forma);

    let usuarioNuevo: UsuarioModel;

    usuarioNuevo = this.forma.value;

    usuarioNuevo.usuario=this.forma.controls.email.value;
    usuarioNuevo.password=this.forma.controls.dni.value;

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
