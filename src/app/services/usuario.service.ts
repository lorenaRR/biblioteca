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

  //private url = 'https://localhost:44389/';
  private url = 'https://app-biblioteca.azurewebsites.net/';

  private urlUsuarios = 'api/Usuarios/SeleccionarUsuarios'
  private urlInsertar = 'api/Usuarios/InsertarUsuarios';
  private urlActualizar = 'api/Usuarios/ActualizarUsuarios';
  private urlActualizarUser = 'api/Usuarios/ActualizarUser';
  private urlActualizarPass = 'api/Usuarios/ActualizarPass';
  private urlBorrar = 'api/Usuarios/BorrarUsuarios/';

  private urlLogin = 'api/Usuarios/Logins';
  private urlFechaNacimiento = 'api/Usuarios/SeleccionarFechaNacimiento';



  private urlReserva = 'api/Reservas/SeleccionarReservas';
  private urlReservaUsuario = 'api/Reservas/SeleccionarReservasUsuarios';
  private urlInsertarReserva = 'api/Reservas/InsertarReserva';
  private urlBorrarReserva = 'api/Reservas/BorrarReserva';

  private urlPrestamo = 'api/Prestamos/SeleccionarPrestamos';
  private urlPrestamoUsuario = 'api/Prestamos/SeleccionarPrestamosUsuarios';
  private urlInsertarPrestamo = 'api/Prestamos/InsertarPrestamos';
  private urlActualizarPrestamo = 'api/Prestamos/ActualizarPrestamos';


  public currentUser = new UsuarioModel;

  constructor(private http:HttpClient) { }

  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  getUsuario(dni:string, nombre:string, apellidos:string, admin:string):Observable<UsuarioModel[]>{  
    return this.http.get<UsuarioModel[]>(this.url + this.urlUsuarios + '?id=' + dni + '&admin=' + admin + '&nombre=' + nombre + '&apellidos=' + apellidos)
  }

  postUsuario(dni:string, usuario:UsuarioModel){
    return this.http.post(this.url + this.urlInsertar,usuario);
  }

  putUsuario(usuario:UsuarioModel){
    return this.http.put(this.url + this.urlActualizar, usuario);
  }

  putUser(usuario:UsuarioModel){
    return this.http.put(this.url + this.urlActualizarUser, usuario);
  }

  putPass(usuario:UsuarioModel){
    return this.http.put(this.url + this.urlActualizarPass, usuario);
  }


  deleteUsuario(dni: any) : Observable<any> {
    let options = {headers: this.getHeaders(),}
    return this.http.delete(this.url + this.urlBorrar + `${dni}`, options)
  }

  login(user:string, pass:string){
    return this.http.get<UsuarioModel>(this.url + this.urlLogin + '?user=' + user + '&pass=' + pass)
  }

  getFechaNacimiento(fecha1:Date, fecha2:Date):Observable<UsuarioModel[]>{  
    return this.http.get<UsuarioModel[]>(this.url + this.urlFechaNacimiento + '?fecha1=' + fecha1 + '&fecha2=' + fecha2)
  }

  /**********************RESERVAS***********************/

  getReserva(isbn:string,dni:string){
    return this.http.get<ReservasModel[]>(this.url + this.urlReserva + '?dni=' + dni + '&isbn=' + isbn)
  }

  getReservaUsuario(isbn:string,dni:string, titulo:string){
    return this.http.get<ReservasModel[]>(this.url + this.urlReservaUsuario + '?dni=' + dni + '&isbn=' + isbn + '&titulo=' + titulo)
  }

  postReserva(reserva:ReservasModel){
    return this.http.post(this.url + this.urlInsertarReserva,reserva);
  }

  deleteReserva(dni:any, isbn:any){
    return this.http.delete(this.url + this.urlBorrarReserva + '?isbn=' + isbn + '&dni=' + dni);
  }

  /**********************PRESTAMOS***********************/

  getPrestamo(isbn:string, dni:string){
    return this.http.get<PrestamosModel[]>(this.url + this.urlPrestamo + '?isbn=' + isbn + '&dni=' + dni)
  }

  postPrestamo(prestamo:PrestamosModel){
    return this.http.post(this.url + this.urlInsertarPrestamo, prestamo);
  }

  putPrestamo(prestamo:PrestamosModel){
    return this.http.put(this.url + this.urlActualizarPrestamo, prestamo);
  }

  getPrestamoUsuario(dni:string){
    return this.http.get<PrestamosModel[]>(this.url + this.urlPrestamoUsuario + '?dni=' + dni)
  }



}
