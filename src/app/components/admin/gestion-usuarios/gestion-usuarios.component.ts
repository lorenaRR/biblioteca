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
  
  usuarios!: UsuarioModel[];
 
  constructor(private formBuilder:FormBuilder, private usuarioService:UsuarioService) {
      this.crearFormulario();
   }


  ngOnInit(): void {
  }


  crearFormulario(){
    this.forma=this.formBuilder.group({
      dni:['', [Validators.required]],
      nombre:['', [Validators.required]],
      apellidos:['', [Validators.required]],
      admin:['', [Validators.required]],
    })
  }

  

  verUsuario(){
   
    this.usuarioService.getUsuario(this.forma.controls.dni.value, this.forma.controls.nombre.value,this.forma.controls.apellidos.value,this.forma.controls.admin.value)
      .subscribe(resp=>{
        this.usuarios = resp;
        console.log(this.usuarios);
      })
  }



}
