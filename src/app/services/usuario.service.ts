import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public usuarios=[
    {
     nombre:'Ana',
     apellidos:'López',
     dni:'123456789A',
     direccion:{
       calle:'La Paz',
       ciudad:'Avilés'
     },
     telefono:'985123123',
     rol:'usuario',
     email:'abc@abc.com',
     usuario:'abc@abc.com',
     password:'123456789A'
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
     rol:'admin',
     email:'abc@abc.com',
     usuario:'admin',
     password:'admin'
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
       rol:'usuario',
       email:'abc@abc.com',
       usuario:'abc@abc.com',
       password:'111111111C'
     }];

  constructor() { }
}
