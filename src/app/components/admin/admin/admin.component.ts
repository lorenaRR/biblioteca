import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { PrestamosModel } from '../../../models/prestamos.models';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  forma!:FormGroup;
  prestamos: PrestamosModel[] = [];
  hoy = new Date();

  constructor(private formBuilder:FormBuilder, private usuarioService:UsuarioService) { 
    this.crearFormulario();
  }

  crearFormulario(){
    this.forma=this.formBuilder.group({
      dni:['']
    })
  }

  ngOnInit(): void {
  }

  buscarPrestamos(){
      this.usuarioService.getPrestamo('',this.forma.controls.dni.value)
        .subscribe((resp:any)=>{
          this.prestamos = resp;
          this.prestamos.forEach(prestamo => {
            if(this.hoy > prestamo.fechaEntrega){
                console.log('No se ha devuelto aún');
            }
            else{
              console.log('Aún hay tiempo');
            }
          });
          
        });

  }

}
