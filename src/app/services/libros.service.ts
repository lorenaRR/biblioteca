import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LibrosResponse } from '../interfaces/libros-response';
import { CatalogoComponent } from '../components/user/catalogo/catalogo.component';





@Injectable({
  providedIn: 'root'
})

export class LibrosService  {

  private url='https://www.googleapis.com/books/v1/volumes?q=';
  


  constructor(private http:HttpClient) { }


  get params(){
    return {
      intitle:'',       //Returns results where the text following this keyword is found in the title.
      inauthor:'',      //Returns results where the text following this keyword is found in the author.
      inpublisher:'',   //Returns results where the text following this keyword is found in the publisher.
      subject:'',       //Returns results where the text following this keyword is listed in the category list of the volume.
      isbn:'',          //Returns results where the text following this keyword is the ISBN number.
      lccn:'',          //Returns results where the text following this keyword is the Library of Congress Control Number.
      oclc:'',          //Returns results where the text following this keyword is the Online Computer Library Center number.
  
    }
  }

  getLibros(criterio:string):Observable<LibrosResponse>{
      
      return this.http.get<LibrosResponse>(`${this.url}`+criterio);
  }
}
