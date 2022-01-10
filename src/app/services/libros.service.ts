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
  
  private urlCategorias='https://localhost:44389/api/Categorias/SeleccionarCategorias';
  private urlCategoriasLibro='https://localhost:44389/api/Categorias/InsertarCategoriasLibro';

  private urlAutores = 'https://localhost:44389/api/Autores/SeleccionarAutores';
  private paramNombre = '?nombre=';
  private paramApellidos = '&apellidos='
  private urlAutoresLibro = 'https://localhost:44389/api/Autores/InsertarAutoresLibro';

  constructor(private http:HttpClient) { }


  getLibros(isbn:string, titulo:string, subtitulo:string, editorial:string, autor:string):Observable<LibrosModel[]>{  
    console.log(this.url + isbn + this.paramTitulo + titulo + this.paramSubtitulo + subtitulo + this.paramEditorial + editorial + this.paramAutor + autor);
    return this.http.get<LibrosModel[]>(this.url + isbn + this.paramTitulo + titulo + this.paramSubtitulo + subtitulo + this.paramEditorial + editorial + this.paramAutor + autor)
  }

  postLibro(libro:LibrosModel){
    console.log(libro);
    return this.http.post(this.urlInsertar,libro);
  }

  getCategorias(){
    return this.http.get<CategoriasModel[]>(this.urlCategorias);

  }

  postCategoriasLibro(categoria_libro:CategoriasLibrosModel){
    console.log(categoria_libro);
    return this.http.post(this.urlCategoriasLibro,categoria_libro);
  }

  getAutores(nombre:string, apellidos:string){
    return this.http.get<AutoresModel[]>(this.urlAutores + this.paramNombre + nombre + this.paramApellidos + apellidos);
  }

  postAutoresLibro(autor_libro:AutoresLibrosModel){
    console.log(autor_libro);
    return this.http.post(this.urlAutoresLibro, autor_libro);
  }


}
