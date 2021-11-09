import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibrosResponse } from '../interfaces/libros-response';

@Injectable({
  providedIn: 'root'
})

export class LibrosService {

  private url='https://www.googleapis.com/books/v1/volumes?q=';

  constructor(private http:HttpClient) { }

  getLibros():Observable<LibrosResponse>{
      return this.http.get<LibrosResponse>(`${this.url}Zafon`);
  }
  
}
