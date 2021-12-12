import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibrosResponse } from '../interfaces/libros-response';
import { LibroResponse } from '../interfaces/libro-response';
import { LibrosModel } from '../models/libros.model';






@Injectable({
  providedIn: 'root'
})

export class LibrosService  {

  private url='https://localhost:44389/api/Libros/SeleccionarLibros?isbn=';

  private paramTitulo ='&titulo=';
  private paramSubtitulo='&subtitulo=';
  private paramEditorial='&editorial=';
  private paramAutor='&autor=';
  

  constructor(private http:HttpClient) { }


  getLibros(isbn:string, titulo:string, subtitulo:string, editorial:string, autor:string):Observable<LibrosModel[]>{  
    return this.http.get<LibrosModel[]>(this.url + isbn + this.paramTitulo + titulo + this.paramSubtitulo + subtitulo + this.paramEditorial + editorial + this.paramAutor + autor)
  }

}
