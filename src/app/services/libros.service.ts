import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibrosModel } from '../models/libros.model';
import { CategoriasModel, CategoriasLibrosModel } from '../models/categorias.model';
import { AutoresModel, AutoresLibrosModel } from '../models/autores.model';






@Injectable({
  providedIn: 'root'
})

export class LibrosService  {

  private url='https://localhost:44389/api/Libros/SeleccionarLibros?isbn=';
  private urlInsertar = 'https://localhost:44389/api/Libros/InsertarLibros';

  private paramTitulo ='&titulo=';
  private paramSubtitulo='&subtitulo=';
  private paramEditorial='&editorial=';
  private paramAutor='&autor=';

  private paramNombre = '?nombre=';
  private paramApellidos = '&apellidos=';
  
  private urlCategorias='https://localhost:44389/api/Categorias/SeleccionarCategorias';
  private urlInsertarCategoria = 'https://localhost:44389/api/Categorias/InsertarCategorias'
  private urlCategoriasLibro='https://localhost:44389/api/Categorias/InsertarCategoriasLibro';

  private urlAutores = 'https://localhost:44389/api/Autores/SeleccionarAutores';
  private urlAutoresLibro = 'https://localhost:44389/api/Autores/InsertarAutoresLibro';
  private urlInsertarAutor = 'https://localhost:44389/api/Autores/InsertarAutores';

  constructor(private http:HttpClient) { }


  getLibros(isbn:string, titulo:string, subtitulo:string, editorial:string, autor:string):Observable<LibrosModel[]>{  
    console.log(this.url + isbn + this.paramTitulo + titulo + this.paramSubtitulo + subtitulo + this.paramEditorial + editorial + this.paramAutor + autor);
    return this.http.get<LibrosModel[]>(this.url + isbn + this.paramTitulo + titulo + this.paramSubtitulo + subtitulo + this.paramEditorial + editorial + this.paramAutor + autor)
  }

  postLibro(libro:LibrosModel){
    return this.http.post(this.urlInsertar,libro);
  }

  getCategorias(){
    return this.http.get<CategoriasModel[]>(this.urlCategorias);
  }

  postCategorias(categoria:CategoriasModel){
    return this.http.post(this.urlInsertarCategoria, categoria)
  }

  postCategoriasLibro(categoria_libro:CategoriasLibrosModel){
    return this.http.post(this.urlCategoriasLibro,categoria_libro);
  }

  getAutores(nombre:string, apellidos:string){
    return this.http.get<AutoresModel[]>(this.urlAutores + this.paramNombre + nombre + this.paramApellidos + apellidos);
  }

  postAutores(autor:AutoresModel){
    return this.http.post(this.urlInsertarAutor, autor);
  }

  postAutoresLibro(autor_libro:AutoresLibrosModel){
    return this.http.post(this.urlAutoresLibro, autor_libro);
  }


}
