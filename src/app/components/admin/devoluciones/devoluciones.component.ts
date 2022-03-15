import { Component, OnInit } from '@angular/core';
import { PrestamosModel } from '../../../models/prestamos.models';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioModel } from '../../../models/usuarios.model';
import { LibrosService } from '../../../services/libros.service';
import swal from 'sweetalert';
import { LibrosModel } from '../../../models/libros.model';

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
    this.usuarioService.putPrestamo(prestamo)
      .subscribe((resp:any)=>{
        swal(resp.Estado);
        this.sumarStock(prestamo);
        this.buscarPrestamos();
      });
  }

  sumarStock(prestamo:PrestamosModel){
    let libro:LibrosModel = new LibrosModel();
    this.librosService.getLibros(prestamo.isbn,'','','')
      .subscribe((resp:any)=>{
        libro=resp[0];
        libro.stock++;
        this.librosService.putLibro(libro)
          .subscribe((resp:any)=>{
            console.log(resp.Estado);
          });
      });
  }

}
