import { Component, OnInit } from '@angular/core';
import { LibrosModel } from '../../../models/libros.model';
import { LibrosService } from '../../../services/libros.service';
import { CategoriasModel, CategoriasLibrosModel } from '../../../models/categorias.model';
import { AutoresModel, AutoresLibrosModel } from '../../../models/autores.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-nuevo-libro',
  templateUrl: './nuevo-libro.component.html',
  styleUrls: ['./nuevo-libro.component.css']
})
export class NuevoLibroComponent implements OnInit {

    categorias: CategoriasModel[] = [];
    autores: AutoresModel[] = [];
    autores_libros: AutoresLibrosModel[] = [];
    categorias_libros: CategoriasLibrosModel[] = [];
    libro: LibrosModel = new LibrosModel;
 
  constructor(private librosService:LibrosService) {
   }


  ngOnInit(): void {
  }

  addAutor(autor: AutoresModel) {
    this.autores.push(autor);
  }

  addCategoria(categoria: CategoriasModel){ 
    this.categorias.push(categoria);
  }

  borrarAutorLibro(autor:AutoresModel){ //Borrar autor lista
    this.autores = this.autores.filter(e => e!==autor);
  }

  borrarCategoriaLibro(categoria:CategoriasModel){//Borrar categoria lista
    this.categorias = this.categorias.filter(e => e!==categoria);
  }

  addAutoresLibro(){ //Añadir relacion aut-libro
    this.autores.forEach(autor => {
      let autor_libro:AutoresLibrosModel = new AutoresLibrosModel;
      autor_libro.isbn = this.libro.isbn;
      autor_libro.id_autor = autor.id_autor;
      this.autores_libros.push(autor_libro);
      this.autores_libros.forEach(aut_libro => {
        this.librosService.postAutoresLibro(aut_libro)
          .subscribe((resp:any)=>{
            swal(resp.Estado);
          });
      });
    });
  }

  addCategoriasLibro(){  //Añadir relacion cat-libro
    this.categorias.forEach(categoria => {
      let categoria_libro:CategoriasLibrosModel = new CategoriasLibrosModel;
      categoria_libro.isbn=this.libro.isbn;
      categoria_libro.id_categoria=categoria.id_categoria;
      this.categorias_libros.push(categoria_libro);
      this.categorias_libros.forEach(cat_libro => {
        this.librosService.postCategoriasLibro(cat_libro)
          .subscribe((resp:any)=>{
            swal(resp.Estado);
          });
      });
    });
  }

  guardarFormulario(){
    if (this.libro.isbn!=null){
      this.librosService.postLibro(this.libro)
        .subscribe((resp:any)=>{
          swal(resp.Estado);
          this.addAutoresLibro();
          this.addCategoriasLibro();
        });
    }
    else{
      swal("El campo ISBN no puede estar vacío.")
    }
    
  }

}