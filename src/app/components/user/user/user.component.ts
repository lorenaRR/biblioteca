import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../models/usuarios.model';
import { UsuarioService } from '../../../services/usuario.service';
import swal from 'sweetalert';
import { PrestamosModel } from '../../../models/prestamos.models';
import { ReservasModel } from '../../../models/reservas.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  usuario!:UsuarioModel;
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
    this.getUsuario();    
  }

  ngOnInit(): void {
    
  }

  getUsuario(){
    let id=localStorage.getItem("idUsuario");
    if (id!=null){
      this.usuarioService.getUsuario(id,'','','99')
        .subscribe((resp:any)=>{
          this.usuario = resp[0];
          this.user=this.usuario.usuario;
          this.calcularLibrosLeidos();
          this.calcularLibrosPrestados();
          this.calcularLibrosReservados();
          this.getPendientes();
        });
    }
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
        this.reservados = resp;
        this.reservados.forEach(r => {
          this.nLibrosReservados++;
        });
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
    console.log(this.usuario);
    this.usuarioService.putUser(this.usuario)
      .subscribe((resp:any)=>{
          swal(resp.Estado);
      });
  }

  actualizarPass(){
    let id=localStorage.getItem("idUsuario"); 
    if (id!=null){
      this.usuarioService.getUsuario(id,'','','99')  //Vuelvo a coger los datos del usuario
        .subscribe((resp:any)=>{
          this.usuario = resp[0];
          if(this.pass == this.pass2 && this.passNueva!=null) //Copruebo los campos de la contraseña
          {
            this.usuarioService.login(this.usuario.usuario, this.pass) //Intento el login
              .subscribe((resp:any)=>{
                if(resp){
                  this.usuario.password = this.passNueva;
                  this.usuarioService.putPass(this.usuario) //Modifico contraseña
                  .subscribe((resp:any)=>{
                      swal(resp.Estado);
                  });
                }  
              });
          }
          else{
            swal('Contraseña incorrecta.');
          }
        });
    }
    
  }

  verPass(id:string, idIcon:string){

    let type = document.getElementById(id);
    let icon = document.getElementById(idIcon);

    if(type?.getAttribute('type') == 'password'){
      type?.setAttribute('type','text');
      icon?.removeAttribute('class');
      icon?.setAttribute('class','fa fa-eye');
    }
    else{
      type?.setAttribute('type','password');
      icon?.removeAttribute('class');
      icon?.setAttribute('class','fa fa-eye-slash');
    }

  }
}


