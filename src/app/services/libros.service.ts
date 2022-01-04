import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibrosModel } from '../models/libros.model';
import { CategoriasModel } from '../models/categorias.model';
import { AutoresModel } from '../models/autores.model';






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
  
  private urlCategorias='https://localhost:44389/api/Categorias/SeleccionarCategorias'

  private urlAutores = 'https://localhost:44389/api/Autores/SeleccionarAutores'

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

  getAutores(){
    return this.http.get<AutoresModel[]>(this.urlAutores);
  }


}
