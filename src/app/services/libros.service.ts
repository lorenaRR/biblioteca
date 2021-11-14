import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibrosResponse } from '../interfaces/libros-response';
import { LibroResponse } from '../interfaces/libro-response';






@Injectable({
  providedIn: 'root'
})

export class LibrosService  {

  private url='https://www.googleapis.com/books/v1/volumes?q=';
  

  constructor(private http:HttpClient) { }


  getLibros(criterio:string):Observable<LibrosResponse>{
      return this.http.get<LibrosResponse>(`${this.url}`+criterio+'&maxResults=40')
  }

  getLibro(id:string):Observable<LibroResponse>{
    return this.http.get<LibroResponse>('https://www.googleapis.com/books/v1/volumes/'+id)
  }
}
