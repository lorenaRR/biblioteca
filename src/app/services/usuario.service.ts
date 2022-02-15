import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuarios.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservasModel } from '../models/reservas.model';
import { PrestamosModel } from '../models/prestamos.models';
import { LibrosModel } from '../models/libros.model';


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private url = 'https://localhost:44389/api/Usuarios/SeleccionarUsuarios?id=';
  private urlInsertar = 'https://localhost:44389/api/Usuarios/InsertarUsuarios';
  private urlActualizar = 'https://localhost:44389/api/Usuarios/ActualizarUsuarios';
  private urlActualizarUser = 'https://localhost:44389/api/Usuarios/ActualizarUser';
  private urlActualizarPass = 'https://localhost:44389/api/Usuarios/ActualizarPass';
  private urlBorrar = 'https://localhost:44389/api/Usuarios/BorrarUsuarios/';

  private urlLogin = 'https://localhost:44389/api/Usuarios/Logins';
  private urlFechaNacimiento = 'https://localhost:44389/api/Usuarios/SeleccionarFechaNacimiento';



  private urlReserva = 'https://localhost:44389/api/Reservas/SeleccionarReservas';
  private urlReservaUsuario = 'https://localhost:44389/api/Reservas/SeleccionarReservasUsuarios';
  private urlInsertarReserva = 'https://localhost:44389/api/Reservas/InsertarReserva';
  private urlBorrarReserva = 'https://localhost:44389/api/Reservas/BorrarReserva';

  private urlPrestamo = 'https://localhost:44389/api/Prestamos/SeleccionarPrestamos';
  private urlPrestamoUsuario = 'https://localhost:44389/api/Prestamos/SeleccionarPrestamosUsuarios';
  private urlInsertarPrestamo = 'https://localhost:44389/api/Prestamos/InsertarPrestamos';
  private urlActualizarPrestamo = 'https://localhost:44389/api/Prestamos/ActualizarPrestamos';

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

  putUser(usuario:UsuarioModel){
    return this.http.put(this.urlActualizarUser, usuario);
  }

  putPass(usuario:UsuarioModel){
    return this.http.put(this.urlActualizarPass, usuario);
  }


  deleteUsuario(dni: any) : Observable<any> {
    let options = {headers: this.getHeaders(),}
    return this.http.delete(this.urlBorrar + `${dni}`, options)
  }

  login(user:string, pass:string){
    return this.http.get<UsuarioModel>(this.urlLogin + '?user=' + user + '&pass=' + pass)
  }

  getFechaNacimiento(fecha1:Date, fecha2:Date):Observable<UsuarioModel[]>{  
    return this.http.get<UsuarioModel[]>(this.urlFechaNacimiento + '?fecha1=' + fecha1 + '&fecha2=' + fecha2)
  }

  /**********************RESERVAS***********************/

  getReserva(isbn:string,dni:string){
    return this.http.get<ReservasModel[]>(this.urlReserva + '?dni=' + dni + '&isbn=' + isbn)
  }

  getReservaUsuario(isbn:string,dni:string, titulo:string){
    return this.http.get<ReservasModel[]>(this.urlReservaUsuario + '?dni=' + dni + '&isbn=' + isbn + '&titulo=' + titulo)
  }

  postReserva(reserva:ReservasModel){
    return this.http.post(this.urlInsertarReserva,reserva);
  }

  deleteReserva(dni:any, isbn:any){
    return this.http.delete(this.urlBorrarReserva + '?isbn=' + isbn + '&dni=' + dni);
  }

  /**********************PRESTAMOS***********************/

  getPrestamo(isbn:string, dni:string){
    return this.http.get<PrestamosModel[]>(this.urlPrestamo + '?isbn=' + isbn + '&dni=' + dni)
  }

  postPrestamo(prestamo:PrestamosModel){
    return this.http.post(this.urlInsertarPrestamo, prestamo);
  }

  putPrestamo(prestamo:PrestamosModel){
    console.log(prestamo);
    return this.http.put(this.urlActualizarPrestamo, prestamo);
  }

  getPrestamoUsuario(dni:string){
    return this.http.get<PrestamosModel[]>(this.urlPrestamoUsuario + '?dni=' + dni)
  }



}
