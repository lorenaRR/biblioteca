import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { LibrosModel } from '../../../models/libros.model';

@Component({
  selector: 'app-gestion-libros',
  templateUrl: './gestion-libros.component.html',
  styleUrls: ['./gestion-libros.component.css']
})
export class GestionLibrosComponent implements OnInit {

  forma!: FormGroup;
 
  constructor(private formBuilder:FormBuilder, private usuarioService:UsuarioService) {
      this.crearFormulario();
   }


  ngOnInit(): void {
  }

  crearFormulario(){
    this.forma=this.formBuilder.group({
          
      title:['', [Validators.required]], 
      authors:['',[Validators.required]],
      description:['', [Validators.required]], 
      categories:['', [Validators.required]], 
      });
  }

  guardarFormulario(){

    console.log(this.forma);

    let libroNuevo = new LibrosModel;
    

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
