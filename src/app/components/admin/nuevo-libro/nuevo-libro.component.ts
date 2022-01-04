import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { LibrosModel } from '../../../models/libros.model';
import { LibrosService } from '../../../services/libros.service';
import { CategoriasModel } from '../../../models/categorias.model';
import { AutoresModel, AutoresLibrosModel } from '../../../models/autores.model';

@Component({
  selector: 'app-nuevo-libro',
  templateUrl: './nuevo-libro.component.html',
  styleUrls: ['./nuevo-libro.component.css']
})
export class NuevoLibroComponent implements OnInit {

  forma!: FormGroup;
  categorias!:CategoriasModel[]; //Todas las categorías de la base de datos
  autores: AutoresModel[] = []; //Todos los autores de la base de datos
  autores_libro: AutoresLibrosModel[] = []; //Las relaciones autor-libro de este libro
  autor_libro: AutoresLibrosModel = new AutoresLibrosModel; //La relación autor-libro que se guardará en el anterior
  nombre_autores_libro:string[]=[]; //Sólo los nombres de los autores del libro
  
 
  constructor(private formBuilder:FormBuilder, private librosService:LibrosService) {
      this.crearFormulario();
      this.cargarListaCategorias();
      this.cargarListaAutores();
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
      categoria:[''],
      autores:['']
      });
  }

  cargarListaCategorias(){
    this.librosService.getCategorias()
        .subscribe(resp=>{
        this.categorias = resp;
        })
  }

  cargarListaAutores(){
    this.librosService.getAutores()
    .subscribe(resp=>{
    this.autores = resp;
    })
  }

  addAutor(){
    this.autor_libro.isbn = this.forma.controls.isbn.value;
    this.autor_libro.id_autor = this.forma.controls.autores.value;

    this.autores_libro.push(this.autor_libro);

    this.autores_libro.forEach(autor_libro => { //Por cada autor de este libro
      this.autores.forEach(autor => { //Por cada autor de la base de datos
        if (autor.id_autor == autor_libro.id_autor){ //Si coinciden los id
          let nombre = autor.nombre + ' '+ autor.apellidos;
          console.log(this.nombre_autores_libro.indexOf(nombre));
          if (this.nombre_autores_libro.indexOf(nombre)==-1) { //Si no exite ya ese autor en la lista
              this.nombre_autores_libro.push(nombre);
          }
          
        }
      });
    });

    console.log(this.autor_libro);
    console.log(this.autores_libro);
    console.log(this.nombre_autores_libro);
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
