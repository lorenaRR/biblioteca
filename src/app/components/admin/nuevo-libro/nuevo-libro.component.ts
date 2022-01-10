import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { LibrosModel } from '../../../models/libros.model';
import { LibrosService } from '../../../services/libros.service';
import { CategoriasModel, CategoriasLibrosModel } from '../../../models/categorias.model';
import { AutoresModel, AutoresLibrosModel } from '../../../models/autores.model';

@Component({
  selector: 'app-nuevo-libro',
  templateUrl: './nuevo-libro.component.html',
  styleUrls: ['./nuevo-libro.component.css']
})
export class NuevoLibroComponent implements OnInit {

  forma!: FormGroup;
  formaAutores!:FormGroup;

  categorias: CategoriasModel[] = []; //Todas las categorías de la base de datos
  categorias_libro: CategoriasLibrosModel[]=[]; //Todas las relaciones categoria-libro de este libro
  nombre_categorias_libro:string[]=[]; //Sólo los nombres de las categorias del libro

  autores: AutoresModel[] = []; //Todos los autores de la base de datos
  autores_libro: AutoresLibrosModel[] = []; //Todas las relaciones autor-libro de este libro
  nombre_autores_libro:string[]=[]; //Sólo los nombres de los autores del libro
  
 
  constructor(private formBuilder:FormBuilder, private librosService:LibrosService) {
      this.crearFormulario();
      this.cargarListaCategorias();
      //this.cargarListaAutores();
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

    this.formaAutores = this.formBuilder.group({
      nombre:[''],
      apellidos:['']
    })
  }

  cargarListaCategorias(){
    this.librosService.getCategorias()
        .subscribe(resp=>{
        this.categorias = resp;
        })
  }

  /*cargarListaAutores(){
    this.librosService.getAutores()
    .subscribe(resp=>{
    this.autores = resp;
    })
  }*/

  buscarAutor(){
    this.librosService.getAutores(this.formaAutores.controls.nombre.value, this.formaAutores.controls.apellidos.value)
    .subscribe(resp=>{
    this.autores = resp;
    })
  }

  addAutor(autorid:string){
    let autor_libro: AutoresLibrosModel = new AutoresLibrosModel; //La relación autor-libro que se guardará en autores_libro
    autor_libro.isbn = this.forma.controls.isbn.value;
    autor_libro.id_autor = autorid;

    this.autores_libro.push(autor_libro);

    this.autores_libro.forEach(autor_libro => { //Por cada autor de este libro
      this.autores.forEach(autor => { //Por cada autor de la base de datos
        if (autor.id_autor == autor_libro.id_autor){ //Si coinciden los id
          let nombre = autor.nombre + ' '+ autor.apellidos;
          if (this.nombre_autores_libro.indexOf(nombre)==-1) { //Si no exite ya ese autor en la lista
              this.nombre_autores_libro.push(nombre);
          } 
        }
      });
    });
  }

  addCategoria(categoriaid:string){
    let categoria_libro: CategoriasLibrosModel = new CategoriasLibrosModel; //La relacion categoria-libro que se guardará en categorias_libro
    categoria_libro.isbn = this.forma.controls.isbn.value;
    categoria_libro.id_categoria=categoriaid;

    this.categorias_libro.push(categoria_libro);

    this.categorias_libro.forEach(categoria_libro => {//Por cada categoria de este libro
      this.categorias.forEach(categoria => {//Por cada categoria de la base de datos
        if(categoria.id_categoria == categoria_libro.id_categoria){ //Si coinciden los id
          let nombre = categoria.categoria;
            if(this.nombre_categorias_libro.indexOf(nombre)){//Si no existe ya esa categoria en la lista
                this.nombre_categorias_libro.push(nombre);
            }
        }        
      });
    });

  }
        
  insertarAutoresLibro(autor_libro:AutoresLibrosModel){
    console.log(autor_libro);
    this.librosService.postAutoresLibro(autor_libro)
    .subscribe((resp:any)=>{
      console.log(resp);
      console.log(resp.Estado);
    });
  }

  insertarCategoriasLibro(categoria_libro:CategoriasLibrosModel){
    console.log(categoria_libro);
    this.librosService.postCategoriasLibro(categoria_libro)
        .subscribe((resp:any)=>{
          console.log(resp);
          console.log(resp.Estado);
        });
  }


  guardarFormulario(){

    console.log(this.forma);

    let libroNuevo:LibrosModel = this.forma.value;
    libroNuevo.reservado=false;
    libroNuevo.prestado=false;

    this.librosService.postLibro(libroNuevo) //Insertar en tabla Libro
    .subscribe((resp:any)=>{
      console.log(resp.Estado);
    });

    this.autores_libro.forEach(autor_libro => { //Insertar en tabla Autores_Libro
      this.insertarAutoresLibro(autor_libro);
    });

    this.categorias_libro.forEach(categoria_libro => { //Insertar en tabla Categorias_libro
      this.insertarCategoriasLibro(categoria_libro);
    });
    

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
