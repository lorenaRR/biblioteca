import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibrosModel, ListaLectores } from '../models/libros.model';
import { CategoriasModel, CategoriasLibrosModel, ListaLibrosCategorias } from '../models/categorias.model';
import { AutoresModel, AutoresLibrosModel } from '../models/autores.model';


@Injectable({
  providedIn: 'root'
})

export class LibrosService  {

  //private url = 'https://localhost:44389/';
  private url = 'https://app-biblioteca.azurewebsites.net/';

  private urlLibro='api/Libros/SeleccionarLibros'; //LIBRO
  private urlInsertar = 'api/Libros/InsertarLibros';
  private urlActualizarLibro = 'api/Libros/ActualizarLibros';
  private urlBorrarLibro = 'api/Libros/BorrarLibro/';
  private urlCatalogo = 'api/Libros/SeleccionarCatalogo';

  private urlCategorias='api/Categorias/SeleccionarCategorias'; //CATEGORIAS
  private urlInsertarCategoria = 'api/Categorias/InsertarCategorias';
  private urlBorrarCategorias= 'api/Categorias/BorrarCategorias/';

  private urlCategoriasLibro='api/Categorias/SeleccionarCategoriasLibro';
  private urlInsertarCategoriasLibro='api/Categorias/InsertarCategoriasLibro';
  private urlBorrarCategoriasLibro = 'api/Categorias/BorrarCategoriasLibros/';
  
  private urlAutores = 'api/Autores/SeleccionarAutores'; //AUTORES
  private urlAutoresUnCampo = 'api/Autores/SeleccionarAutoresLibroUnCampo'
  private urlInsertarAutor = 'api/Autores/InsertarAutores';
  private urlBorrarAutor = 'api/Autores/BorrarAutores/'

  private urlAutoresLibro = 'api/Autores/SeleccionarAutoresLibro'; 
  private urlInsertarAutorLibro='api/Autores/InsertarAutoresLibro';
  private urlBorrarAutorLibro ='api/Autores/BorrarAutoresLibros/';

  private urlNoDevueltos = 'api/Prestamos/SeleccionarNoDevueltos'; //INFORMES
  private urlNumLibrosCategorias = 'api/Categorias/SeleccionarNumLibrosPorCategorias';
  private urlNumUsuariosCategorias = 'api/Categorias/SeleccionarNumUsuariosPorCategorias';
  private urlNumLectores = 'api/Libros/SeleccionarNumLectores';

  constructor(private http:HttpClient) { }

  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  /*************************LIBROS*************************/

  getLibros(isbn:string, titulo:string, subtitulo:string, editorial:string):Observable<LibrosModel[]>{  
    return this.http.get<LibrosModel[]>(this.url + this.urlLibro + '?isbn=' + isbn + '&titulo=' + titulo + '&subtitulo=' + subtitulo + '&editorial=' + editorial)
  }

  getLibrosCatalogo(isbn:string, titulo:string, subtitulo:string, editorial:string, autor:string, categoria:string):Observable<LibrosModel[]>{  
    return this.http.get<LibrosModel[]>(this.url + this.urlCatalogo + '?isbn=' + isbn + '&titulo=' + titulo + '&subtitulo=' + subtitulo + '&editorial=' + editorial + '&autor=' + autor + '&categoria=' + categoria)
  }

  postLibro(libro:LibrosModel){
    return this.http.post(this.url + this.urlInsertar,libro);
  }

  putLibro(libro:LibrosModel){
    return this.http.put(this.url + this.urlActualizarLibro,libro);
  }

  deleteLibro(isbn:any){
    let options = {headers: this.getHeaders(),}
    return this.http.delete(this.url + this.urlBorrarLibro + `${isbn}`, options)
  }

  /*************************CATEGORIAS*************************/

  getCategorias(id_categoria:string, categoria:string){
    return this.http.get<CategoriasModel[]>(this.url + this.urlCategorias + '?id_categoria=' + id_categoria + '&categoria=' + categoria);
  }

  postCategorias(categoria:CategoriasModel){
    return this.http.post(this.url + this.urlInsertarCategoria, categoria)
  }

  deleteCategorias(id_categorias:any){
    let options = {headers: this.getHeaders(),}
    return this.http.delete(this.url + this.urlBorrarCategorias + `${id_categorias}`, options)
  }

  /**********************CATEGORIAS-LIBROS***********************/

  getCategoriasLibro(isbn:string, id_categoria:string){
    return this.http.get<CategoriasLibrosModel[]>(this.url + this.urlCategoriasLibro + '?isbn=' + isbn + '&id_categoria=' + id_categoria);
  }
  
  postCategoriasLibro(categoria_libro:CategoriasLibrosModel){
    return this.http.post(this.url + this.urlInsertarCategoriasLibro,categoria_libro);
  }

  deleteCategoriasLibro(id_categoria:any, isbn:any){
    return this.http.delete(this.url + this.urlBorrarCategoriasLibro + '?id_categoria=' + id_categoria + '&isbn=' + isbn)
  }

  /*************************AUTORES*************************/
  
  getAutores(id_autor:string, nombre:string, apellidos:string){
    return this.http.get<AutoresModel[]>(this.url + this.urlAutores + '?id_autor=' + id_autor + '&nombre=' + nombre + '&apellidos=' + apellidos);
  }

  getAutoresUnCampo(autor:string){
    return this.http.get<AutoresModel[]>(this.url + this.urlAutoresUnCampo + '?autor=' + autor);
  }

  postAutores(autor:AutoresModel){
    return this.http.post(this.url + this.urlInsertarAutor, autor);
  }

  deleteAutor(id_autor:any){
    let options = {headers: this.getHeaders(),}
    return this.http.delete(this.url + this.urlBorrarAutor + `${id_autor}`, options)
  }

  /**********************AUTORES-LIBROS***********************/


  getAutoresLibro(isbn:string, id_autor:string){
    return this.http.get<AutoresLibrosModel[]>(this.url + this.urlAutoresLibro + '?isbn=' + isbn + '&id_autor=' + id_autor);
  }

  postAutoresLibro(autor_libro:AutoresLibrosModel){
    return this.http.post(this.url + this.urlInsertarAutorLibro, autor_libro);
  }

  deleteAutoresLibro(id_autor:any, isbn:any){
    return this.http.delete(this.url + this.urlBorrarAutorLibro + '?id_autor=' + id_autor + '&isbn=' + isbn);
  }

    /**********************INFORMES***********************/

  getNoDevueltos(){
    return this.http.get<LibrosModel[]>(this.url + this.urlNoDevueltos);
  }

  getNumLibrosPorCategorias(){
    return this.http.get<ListaLibrosCategorias[]>(this.url + this.urlNumLibrosCategorias);
  }

  getNumUsuariosPorCategorias(){
    return this.http.get<ListaLibrosCategorias[]>(this.url + this.urlNumUsuariosCategorias);
  }

  getNumLectores(){
    return this.http.get<ListaLectores[]>(this.url + this.urlNumLectores);
  }

}
