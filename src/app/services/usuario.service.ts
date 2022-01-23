import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuarios.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservasModel } from '../models/reservas.model';
import { PrestamosModel } from '../models/prestamos.models';


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private url = 'https://localhost:44389/api/Usuarios/SeleccionarUsuarios?id=';
  private urlInsertar = 'https://localhost:44389/api/Usuarios/InsertarUsuarios';
  private urlActualizar = 'https://localhost:44389/api/Usuarios/ActualizarUsuarios';
  private urlBorrar = 'https://localhost:44389/api/Usuarios/BorrarUsuarios/';

  private urlLogin = 'https://localhost:44389/api/Usuarios/Logins';

  private urlReserva = 'https://localhost:44389/api/Reservas/SeleccionarReservas';
  private urlInsertarReserva = 'https://localhost:44389/api/Reservas/InsertarReserva';

  private urlPrestamo = 'https://localhost:44389/api/Prestamos/SeleccionarPrestamos';
  private urlInsertarPrestamo = 'https://localhost:44389/api/Prestamos/InsertarPrestamos';

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

  deleteUsuario(dni: any) : Observable<any> {
    let options = {headers: this.getHeaders(),}
    return this.http.delete(this.urlBorrar + `${dni}`, options)
  }

  login(user:string, pass:string){
    return this.http.get<UsuarioModel>(this.urlLogin + '?user=' + user + '&pass=' + pass)
  }

  /**********************RESERVAS***********************/

  getReserva(isbn:string,dni:string){
    return this.http.get<ReservasModel[]>(this.urlReserva + '?dni=' + dni + '&isbn=' + isbn)
  }

  postReserva(reserva:ReservasModel){
    return this.http.post(this.urlInsertarReserva,reserva);
  }

  /**********************PRESTAMOS***********************/

  getPrestamo(isbn:string, dni:string){
    return this.http.get<PrestamosModel[]>(this.urlPrestamo + '?isbn=' + isbn + '&dni=' + dni)
  }

  postPrestamo(prestamo:PrestamosModel){
    return this.http.post(this.urlInsertarPrestamo, prestamo);
  }

}
