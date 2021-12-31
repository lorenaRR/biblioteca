import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { LibrosModel } from '../../../models/libros.model';
import { LibrosService } from '../../../services/libros.service';
import { CategoriasModel } from '../../../models/categorias.model';

@Component({
  selector: 'app-nuevo-libro',
  templateUrl: './nuevo-libro.component.html',
  styleUrls: ['./nuevo-libro.component.css']
})
export class NuevoLibroComponent implements OnInit {

  forma!: FormGroup;
  categorias!:CategoriasModel[];
 
  constructor(private formBuilder:FormBuilder, private librosService:LibrosService) {
      this.crearFormulario();
      this.cargarListaCategorias();
   }


  ngOnInit(): void {
  }

  crearFormulario(){
    this.forma=this.formBuilder.group({      
      isbn:[''], 
      titulo:[''],
      subtitulo:[''], 
      fechaPublicacion!:[''],  
      descripcion: [''], 
      nPaginas: [''], 
      imagen:  [''], 
      editorial!: [''], 
      stock: [''], 
      });
  }

  cargarListaCategorias(){
    this.librosService.getCategorias()
        .subscribe(resp=>{
        this.categorias = resp;
        })
  }
        
  guardarFormulario(){

    console.log(this.forma);

    let libroNuevo:LibrosModel = this.forma.value;
    libroNuevo.reservado=false;
    libroNuevo.prestado=false;

    console.log(libroNuevo);

    this.librosService.postLibro(libroNuevo)
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
