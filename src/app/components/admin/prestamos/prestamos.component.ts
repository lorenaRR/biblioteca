import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioModel } from '../../../models/usuarios.model';
import { PrestamosModel } from '../../../models/prestamos.models';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import swal from 'sweetalert';
import { LibrosModel } from '../../../models/libros.model';
import { LibrosService } from '../../../services/libros.service';


@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css'],
})
export class PrestamosComponent implements OnInit {

  usuarios: UsuarioModel[] = [];
  libro: LibrosModel = new LibrosModel;
  dni!: string;
  nombre!: string;
  apellidos!: string;
  id:any;


  constructor(private librosService:LibrosService, private usuarioService:UsuarioService, private route:ActivatedRoute) {
    
   }

   ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');
    this.getLibro();
  }


  buscarUsuario(){
    if(this.dni==null){
      this.dni="";
    }
    if(this.nombre==null){
      this.nombre="";
    }
    if(this.apellidos==null){
      this.apellidos="";
    }

    this.usuarioService.getUsuario(this.dni, this.nombre, this.apellidos,'0')
      .subscribe((resp:any)=>{
        this.usuarios=resp;
      });
  }

  getLibro(){
    this.librosService.getLibros(this.id,'','','')
      .subscribe((resp:any)=>{
        this.libro = resp[0];
      });
  }

  prestar(dni:string){
    let prestamo:PrestamosModel = new PrestamosModel;
    prestamo.dni=dni;
    prestamo.isbn=this.id;
    prestamo.fechaPrestamo = new Date();
    prestamo.fechaEntrega = moment(prestamo.fechaPrestamo).add(15, 'days').toDate(); 
    console.log(prestamo);
    this.usuarioService.postPrestamo(prestamo)
      .subscribe((resp:any)=>{
        swal(resp.Estado);
      });
    
  }

}
