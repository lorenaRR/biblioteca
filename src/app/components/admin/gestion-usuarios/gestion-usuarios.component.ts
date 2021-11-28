import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';


@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styles: [
  ]
})
export class GestionUsuariosComponent implements OnInit {


  forma!: FormGroup;
  formaUsu!: FormGroup;
 
  constructor(private formBuilder:FormBuilder, private usuarioService:UsuarioService) {
      this.crearFormulario();

   }


  ngOnInit(): void {
  }


  crearFormulario(){
    this.formaUsu=this.formBuilder.group({
      dni:['', [Validators.required]]
    })
  }

  verUsuario(){
    this.usuarioService.getUsuario(this.formaUsu.controls.dni.value)
      .subscribe(resp=>{
        console.log(resp);
      })
  }

  

}
