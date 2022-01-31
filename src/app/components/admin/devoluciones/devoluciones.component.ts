import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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

  forma!:FormGroup;
  prestamos: PrestamosModel[] = [];
  usuarios: UsuarioModel[] = [];
  libros:LibrosService[]=[];
  datePipe!: DatePipe;
  hoy = new Date();


  constructor(private formBuilder:FormBuilder, private usuarioService:UsuarioService, private librosService:LibrosService) { 
    this.crearFormulario();
  }

  crearFormulario(){
    this.forma=this.formBuilder.group({
      dni:['']
    });
  }

   ngOnInit(): void {
  }

  buscarPrestamos(){
    this.prestamos = [];
      this.usuarioService.getPrestamo('',this.forma.controls.dni.value)
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
      });
  }

}
