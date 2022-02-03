import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../models/usuarios.model';
import { UsuarioService } from '../../../services/usuario.service';
import swal from 'sweetalert';
import { LibrosService } from '../../../services/libros.service';
import { PrestamosModel } from '../../../models/prestamos.models';
import { ReservasModel } from '../../../models/reservas.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public usuario!:UsuarioModel;
  user!:string;
  pass!:string;
  pass2!:string;
  passNueva!:string;
  nLibrosPrestados=0;
  prestados: PrestamosModel[] = [];
  nLibrosReservados=0;
  reservados: ReservasModel[] = [];
  nLibrosLeidos=0;
  pendiente!:boolean;
  pendientes: PrestamosModel[] = [];


  constructor(private usuarioService:UsuarioService) { 
    this.usuario=this.usuarioService.currentUser;
    this.user=this.usuario.usuario;
    this.calcularLibrosLeidos();
    this.calcularLibrosPrestados();
  }

  ngOnInit(): void {

  }

  calcularLibrosPrestados(){
    this.usuarioService.getPrestamo('',this.usuario.dni)
      .subscribe((resp:any)=>{ 
        this.prestados=resp;
        this.prestados.forEach(p => {
          if(p.fechaDevolucion==null){
            this.nLibrosPrestados++;
          }
        });
      });
  }

  calcularLibrosLeidos(){
    this.usuarioService.getPrestamo('',this.usuario.dni)
      .subscribe((resp:any)=>{ 
        this.prestados=resp;
        this.prestados.forEach(p => {
          if(p.fechaDevolucion!=null){
            this.nLibrosLeidos++;
          }
        });
      });
  }

  calcularLibrosReservados(){
    this.usuarioService.getReserva('',this.usuario.dni)
      .subscribe((resp:any)=>{
        this.nLibrosReservados = resp.lenght;
      });
  }

  getPendientes(){
    this.usuarioService.getPrestamo('', this.usuario.dni)
      .subscribe((resp:any)=>{
        this.pendientes=resp;
        this.pendientes.forEach(p => {
          if(p.fechaInvalida){
            this.pendiente = true;
          }
        });
      });
  }

  actualizarUser(){
    this.usuario.usuario = this.user;
    this.usuarioService.putUsuario(this.usuario)
      .subscribe((resp:any)=>{
          swal(resp.Estado);
      });
  }

  actualizarPass(){
    if(this.usuario.password==this.pass && this.pass == this.pass2 && this.passNueva!=null)
    {
      this.usuario.password = this.passNueva;
      this.usuarioService.putUsuario(this.usuario)
      .subscribe((resp:any)=>{
          swal(resp.Estado);
      });
    }
    else{
      swal("Contraseña incorrecta.");
    }
  }

  verPass(id:string){
    let type = document.getElementById(id);
    console.log(type);
    
  }
}
