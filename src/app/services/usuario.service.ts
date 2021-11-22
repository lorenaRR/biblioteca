import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuarios.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public usuarios:UsuarioModel[]=[
    {
     nombre:'Ana',
     apellidos:'López',
     dni:'123456789A',
     direccion:{
       calle:'La Paz',
       ciudad:'Avilés'
     },
     telefono:'985123123',
     admin:false,
     email:'abc@abc.com',
     usuario:'user',
     password:'user',
     listaLibros:[{
       id: '2zgRDXFWkm8C',
       fecha: '12/07/21'
     },
     {
      id: 'fYa_hJ4bWnsC',
      fecha:'02/05/21'
     }]
   },
   {
     nombre:'Lorena',
     apellidos:'Rodríguez',
     dni:'987654321B',
     direccion:{
       calle:'Flor',
       ciudad:'Avilés'
     },
     telefono:'985123123',
     admin:true,
     email:'abc@abc.com',
     usuario:'admin',
     password:'admin',
     listaLibros:[]
   },
   {
       nombre:'Pepe',
       apellidos:'Pérez',
       dni:'111111111C',
       direccion:{
         calle:'Mar',
         ciudad:'Oviedo'
       },
       telefono:'666555444',
       admin:false,
       email:'abc@abc.com',
       usuario:'111111111C',
       password:'abc@abc.com',
       listaLibros:[]
     }];

  private url = 'https://localhost:44367/api/Usuarios/'

  public currentUser = new UsuarioModel;

  constructor(private http:HttpClient) { }

  getUsuario(dni:string):Observable<UsuarioModel>{
      return this.http.get<UsuarioModel>(this.url+dni)
  }

}
