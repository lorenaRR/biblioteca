import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReservasModel } from '../../../models/reservas.model';
import { UsuarioService } from '../../../services/usuario.service';
import { LibrosService } from '../../../services/libros.service';
import { LibrosModel } from '../../../models/libros.model';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  forma!:FormGroup;
  todasReservas: ReservasModel[] = [];
  reservas: ReservasModel[] = [];
  libros: LibrosModel[] = [];

  constructor(private usuarioService:UsuarioService, private librosService:LibrosService, private formBuilder:FormBuilder) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.forma=this.formBuilder.group({
      dni:[''],
      isbn:[''],
      titulo:['']
    });
  }


  buscarReservas(){
    this.reservas=[];
    this.todasReservas=[];
    this.usuarioService.getReserva(this.forma.controls.isbn.value, this.forma.controls.dni.value)
      .subscribe((resp:any)=>{
        this.todasReservas = resp;
        this.todasReservas.forEach(reserva => {
          console.log(reserva.isbn);
          console.log(this.forma.controls.titulo.value);
          this.librosService.getLibros(reserva.isbn, this.forma.controls.titulo.value,'','')
            .subscribe((resp:any)=>{
              if (resp!=null){
                this.reservas.push(reserva);
              }
            });           
        });
      });
  }

  cancelarReserva(reserva:ReservasModel){

  }

}
