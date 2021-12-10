import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuarios.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
     direccion:'La Paz',
     telefono:'985123123',
     admin:false,
     email:'abc@abc.com',
     usuario:'user',
     password:'user'
    },
   {
     nombre:'Lorena',
     apellidos:'Rodríguez',
     dni:'987654321B',
     direccion:'Flor',
     telefono:'985123123',
     admin:true,
     email:'abc@abc.com',
     usuario:'admin',
     password:'admin'
   },
   {
       nombre:'Pepe',
       apellidos:'Pérez',
       dni:'111111111C',
       direccion:'Mar',
       telefono:'666555444',
       admin:false,
       email:'abc@abc.com',
       usuario:'111111111C',
       password:'abc@abc.com'
     }];

  private url = 'https://localhost:44389/api/Usuarios/SeleccionarUsuarios?id=';
  private urlInsertar = 'https://localhost:44389/api/Usuarios/InsertarUsuarios';
  private urlActualizar = 'https://localhost:44389/api/Usuarios/ActualizarUsuarios';
  private urlBorrar = 'https://localhost:44389/api/Usuarios/BorrarUsuarios/';

  private paramNombre ='&nombre=';
  private paramApellidos='&apellidos=';
  private paramAdmin='&admin=';
 

  public currentUser = new UsuarioModel;

  constructor(private http:HttpClient) { }

  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  getUsuario(dni:string, nombre:string, apellidos:string, admin:string):Observable<UsuarioModel[]>{  
    return this.http.get<UsuarioModel[]>(this.url + dni + this.paramAdmin + admin + this.paramNombre + nombre + this.paramApellidos + apellidos)
  }

  postUsuario(dni:string, usuario:UsuarioModel){
    return this.http.post(this.urlInsertar,usuario);
  }

  putUsuario(usuario:UsuarioModel){
    return this.http.put(this.urlActualizar, usuario);
  }

  /*deleteUsuario(dni:string){
    console.log('Es: ' + dni );
    let options = {headers: this.getHeaders(), 
    body: {
      dni:dni
    }}
    console.log(options);
    return this.http.post<String>(this.urlBorrar, options);
  }*/

  deleteUsuario(dni: any) : Observable<any> {
    console.log('Es: ' + dni );
    let options = {headers: this.getHeaders(),}
    return this.http.get(this.urlBorrar + `${dni}`, options)
  }

   

}
