import { Component, OnInit } from '@angular/core';
import { LibrosModel } from '../../../models/libros.model';
import { LibrosService } from '../../../services/libros.service';
import { CategoriasModel, CategoriasLibrosModel } from '../../../models/categorias.model';
import { AutoresModel, AutoresLibrosModel } from '../../../models/autores.model';
import swal from 'sweetalert';
import { ClassField } from '@angular/compiler';

@Component({
  selector: 'app-nuevo-libro',
  templateUrl: './nuevo-libro.component.html',
  styleUrls: ['./nuevo-libro.component.css']
})
export class NuevoLibroComponent implements OnInit {

    categorias: CategoriasModel[] = [];
    autores: AutoresModel[] = [];
    autores_libros: AutoresLibrosModel[] = [];
    libro: LibrosModel = new LibrosModel;
    isbnNoValido = false;
    categoriasNoValido = false;
    autoresNoValido = false;
    stockNoValido = false;
 
  constructor(private librosService:LibrosService) {
   }


  ngOnInit(): void {
    this.libro.stock = 1;
  }

  addAutor(autor: AutoresModel) {
    if(!this.autores.includes(autor)){
      this.autores.push(autor);
    }
  }

  addCategoria(categoria: CategoriasModel){ 
    if(!this.categorias.includes(categoria)){
      this.categorias.push(categoria);
    }
  }

  borrarAutorLibro(autor:AutoresModel){ //Borrar autor lista
    this.autores = this.autores.filter(e => e!==autor);
  }

  borrarCategoriaLibro(categoria:CategoriasModel){//Borrar categoria lista
    this.categorias = this.categorias.filter(e => e!==categoria);
  }

  addAutoresLibro(){ //Añadir relacion aut-libro
    let aut_libro:AutoresLibrosModel = new AutoresLibrosModel;
    let array_aut_libro:AutoresLibrosModel[] = [];
    this.autores.forEach(autor => {     
      aut_libro.isbn = this.libro.isbn;
      aut_libro.id_autor = autor.id_autor;
      array_aut_libro.push(aut_libro);
      aut_libro = new AutoresLibrosModel;
    });
    array_aut_libro.forEach(aut => {
      this.librosService.postAutoresLibro(aut)
        .subscribe((resp:any)=>{
          console.log(resp);
        });
    });
  }

  addCategoriasLibro(){  //Añadir relacion cat-libro
    let cat_libro:CategoriasLibrosModel = new CategoriasLibrosModel;
    let array_cat_libro:CategoriasLibrosModel[]=[];
    this.categorias.forEach(categoria => {
      cat_libro.isbn=this.libro.isbn;
      cat_libro.id_categoria=categoria.id_categoria;
      array_cat_libro.push(cat_libro);
      cat_libro=new CategoriasLibrosModel; 
    });
    array_cat_libro.forEach(cat => {
      this.librosService.postCategoriasLibro(cat)
        .subscribe((resp:any)=>{
          console.log(resp);
        });
    });
  }

  guardarFormulario(){
        
    if (this.libro.isbn!=null || this.libro.isbn == ""){
      this.isbnNoValido=false;
    }
    else{
      this.isbnNoValido=true;
      swal("El campo ISBN no puede estar vacío.")
    }

    if (this.categorias.length ==0){
      this.categoriasNoValido = true;
    }
    else{
      this.categoriasNoValido = false;
    }

    if (this.autores.length ==0){
      this.autoresNoValido = true;
    }
    else{
      this.autoresNoValido = false;
    }

    if(this.libro.stock<0 || Number.isNaN(this.libro.stock) || !Number.isInteger(this.libro.stock)){
        this.stockNoValido = true;
        swal("El stock tiene que ser un número entero y positivo.")
    }
    else{
      this.stockNoValido = false;
    }

    if(!this.isbnNoValido && !this.categoriasNoValido && !this.autoresNoValido && !this.stockNoValido){
      this.librosService.postLibro(this.libro)
        .subscribe((resp:any)=>{
          swal(resp.Estado);
          this.addAutoresLibro();
          this.addCategoriasLibro();
          this.libro = new LibrosModel;
          this.categorias = [];
          this.autores = [];
        });
    }
    
  }

}