import { Component, OnInit } from '@angular/core';
import { PrestamosModel } from '../../../models/prestamos.models';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioModel } from '../../../models/usuarios.model';
import { LibrosService } from '../../../services/libros.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.css']
})
export class DevolucionesComponent implements OnInit {

  dni!:string;
  prestamos: PrestamosModel[] = [];
  usuarios: UsuarioModel[] = [];
  libros:LibrosService[]=[];
  datePipe!: DatePipe;
  hoy = new Date();


  constructor( private usuarioService:UsuarioService, private librosService:LibrosService) { 
  }


   ngOnInit(): void {
  }

  buscarPrestamos(){
    this.prestamos = [];
    if(this.dni==null){
      this.dni="";
    }
      this.usuarioService.getPrestamoUsuario(this.dni)
        .subscribe((resp:any)=>{
          let todosPrestamos:PrestamosModel[] = resp;
          todosPrestamos.forEach(tPrestamo => {
            if(tPrestamo.fechaDevolucion == null){
              this.prestamos.push(tPrestamo);
            }
          });        
        });
  }

  devolverLibro(prestamo:PrestamosModel){
    prestamo.fechaDevolucion = new Date();
    console.log(prestamo);
    this.usuarioService.putPrestamo(prestamo)
      .subscribe((resp:any)=>{
        swal(resp.Estado);
        this.buscarPrestamos();
      });
  }

}
