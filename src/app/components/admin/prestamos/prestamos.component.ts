import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioModel } from '../../../models/usuarios.model';
import { PrestamosModel } from '../../../models/prestamos.models';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import swal from 'sweetalert';


@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css'],
})
export class PrestamosComponent implements OnInit {

  forma!:FormGroup;
  usuarios: UsuarioModel[] = [];
  id:any;

  constructor(private formBuilder:FormBuilder, private usuarioService:UsuarioService, private route:ActivatedRoute) {
    this.crearFormulario();
   }

  crearFormulario(){
    this.forma=this.formBuilder.group({
      dni:[''],
      nombre:[''],
      apellidos:['']
    })
  }

  buscarUsuario(){
    this.usuarioService.getUsuario(this.forma.controls.dni.value, this.forma.controls.nombre.value, this.forma.controls.apellidos.value,'0')
      .subscribe((resp:any)=>{
        this.usuarios=resp;
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

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');
  }

}
