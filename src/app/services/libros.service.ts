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

  public mensaje!:string;

  private url='https://localhost:44389/api/Libros/SeleccionarLibros?isbn='; //LIBRO
  private urlInsertar = 'https://localhost:44389/api/Libros/InsertarLibros';
  private urlActualizarLibro = 'https://localhost:44389/api/Libros/ActualizarLibros';
  private urlBorrarLibro = 'https://localhost:44389/api/Libros/BorrarLibro/';
  private urlCatalogo = 'https://localhost:44389/api/Libros/SeleccionarCatalogo';

  private paramTitulo ='&titulo='; //PARAMETROS
  private paramSubtitulo='&subtitulo=';
  private paramEditorial='&editorial=';
  
  private urlCategorias='https://localhost:44389/api/Categorias/SeleccionarCategorias'; //CATEGORIAS
  private urlInsertarCategoria = 'https://localhost:44389/api/Categorias/InsertarCategorias';
  private urlBorrarCategorias= 'https://localhost:44389/api/Categorias/BorrarCategorias/';

  private urlCategoriasLibro='https://localhost:44389/api/Categorias/SeleccionarCategoriasLibro';
  private urlInsertarCategoriasLibro='https://localhost:44389/api/Categorias/InsertarCategoriasLibro';
  private urlBorrarCategoriasLibro = 'https://localhost:44389/api/Categorias/BorrarCategoriasLibros/';
  
  private urlAutores = 'https://localhost:44389/api/Autores/SeleccionarAutores'; //AUTORES
  private urlAutoresUnCampo = 'https://localhost:44389/api/Autores/SeleccionarAutoresLibroUnCampo'
  private urlInsertarAutor = 'https://localhost:44389/api/Autores/InsertarAutores';
  private urlBorrarAutor = 'https://localhost:44389/api/Autores/BorrarAutores/'

  private urlAutoresLibro = 'https://localhost:44389/api/Autores/SeleccionarAutoresLibro'; 
  private urlInsertarAutorLibro='https://localhost:44389/api/Autores/InsertarAutoresLibro';
  private urlBorrarAutorLibro ='https://localhost:44389/api/Autores/BorrarAutoresLibros/';

  private urlNoDevueltos = 'https://localhost:44389/api/Prestamos/SeleccionarNoDevueltos'; //INFORMES
  private urlNumLibrosCategorias = 'https://localhost:44389/api/Categorias/SeleccionarNumLibrosPorCategorias';
  private urlNumUsuariosCategorias = 'https://localhost:44389/api/Categorias/SeleccionarNumUsuariosPorCategorias';
  private urlNumLectores = 'https://localhost:44389/api/Libros/SeleccionarNumLectores';

  constructor(private http:HttpClient) { }

  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  /*************************LIBROS*************************/

  getLibros(isbn:string, titulo:string, subtitulo:string, editorial:string):Observable<LibrosModel[]>{  
    return this.http.get<LibrosModel[]>(this.url + isbn + this.paramTitulo + titulo + this.paramSubtitulo + subtitulo + this.paramEditorial + editorial)
  }

  getLibrosCatalogo(isbn:string, titulo:string, subtitulo:string, editorial:string, autor:string, categoria:string):Observable<LibrosModel[]>{  
    return this.http.get<LibrosModel[]>(this.urlCatalogo + '?isbn=' + isbn + '&titulo=' + titulo + '&subtitulo=' + subtitulo + '&editorial=' + editorial + '&autor=' + autor + '&categoria=' + categoria)
  }

  postLibro(libro:LibrosModel){
    return this.http.post(this.urlInsertar,libro);
  }

  putLibro(libro:LibrosModel){
    return this.http.put(this.urlActualizarLibro,libro);
  }

  deleteLibro(isbn:any){
    let options = {headers: this.getHeaders(),}
    return this.http.delete(this.urlBorrarLibro + `${isbn}`, options)
  }

  /*************************CATEGORIAS*************************/

  getCategorias(id_categoria:string, categoria:string){
    return this.http.get<CategoriasModel[]>(this.urlCategorias + '?id_categoria=' + id_categoria + '&categoria=' + categoria);
  }

  postCategorias(categoria:CategoriasModel){
    return this.http.post(this.urlInsertarCategoria, categoria)
  }

  deleteCategorias(id_categorias:any){
    let options = {headers: this.getHeaders(),}
    return this.http.delete(this.urlBorrarCategorias + `${id_categorias}`, options)
  }

  /**********************CATEGORIAS-LIBROS***********************/

  getCategoriasLibro(isbn:string, id_categoria:string){
    return this.http.get<CategoriasLibrosModel[]>(this.urlCategoriasLibro + '?isbn=' + isbn + '&id_categoria=' + id_categoria);
  }
  
  postCategoriasLibro(categoria_libro:CategoriasLibrosModel){
    return this.http.post(this.urlInsertarCategoriasLibro,categoria_libro);
  }

  deleteCategoriasLibro(id_categoria:any, isbn:any){
    return this.http.delete(this.urlBorrarCategoriasLibro + '?id_categoria=' + id_categoria + '&isbn=' + isbn)
  }

  /*************************AUTORES*************************/
  
  getAutores(id_autor:string, nombre:string, apellidos:string){
    return this.http.get<AutoresModel[]>(this.urlAutores + '?id_autor=' + id_autor + '&nombre=' + nombre + '&apellidos=' + apellidos);
  }

  getAutoresUnCampo(autor:string){
    return this.http.get<AutoresModel[]>(this.urlAutoresUnCampo + '?autor=' + autor);
  }

  postAutores(autor:AutoresModel){
    return this.http.post(this.urlInsertarAutor, autor);
  }

  deleteAutor(id_autor:any){
    let options = {headers: this.getHeaders(),}
    return this.http.delete(this.urlBorrarAutor + `${id_autor}`, options)
  }

  /**********************AUTORES-LIBROS***********************/


  getAutoresLibro(isbn:string, id_autor:string){
    return this.http.get<AutoresLibrosModel[]>(this.urlAutoresLibro + '?isbn=' + isbn + '&id_autor=' + id_autor);
  }

  postAutoresLibro(autor_libro:AutoresLibrosModel){
    return this.http.post(this.urlInsertarAutorLibro, autor_libro);
  }

  deleteAutoresLibro(id_autor:any, isbn:any){
    return this.http.delete(this.urlBorrarAutorLibro + '?id_autor=' + id_autor + '&isbn=' + isbn);
  }

    /**********************INFORMES***********************/

  getNoDevueltos(){
    return this.http.get<LibrosModel[]>(this.urlNoDevueltos);
  }

  getNumLibrosPorCategorias(){
    return this.http.get<ListaLibrosCategorias[]>(this.urlNumLibrosCategorias);
  }

  getNumUsuariosPorCategorias(){
    return this.http.get<ListaLibrosCategorias[]>(this.urlNumUsuariosCategorias);
  }

  getNumLectores(){
    return this.http.get<ListaLectores[]>(this.urlNumLectores);
  }

}
