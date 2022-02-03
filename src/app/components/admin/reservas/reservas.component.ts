import { Component, OnInit } from '@angular/core';
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

  dni!:string;
  isbn!:string;
  titulo!:string;
  todasReservas: ReservasModel[] = [];
  reservas: ReservasModel[] = [];
  libros: LibrosModel[] = [];

  constructor(private usuarioService:UsuarioService, private librosService:LibrosService) { 
  }

  ngOnInit(): void {
  }



  buscarReservas(){
    this.reservas=[];
    this.todasReservas=[];
    
    if(this.dni==null){
      this.dni="";
    }
    if(this.isbn==null){
      this.isbn="";
    }
    if(this.titulo==null){
      this.titulo="";
    }

    this.usuarioService.getReserva(this.isbn, this.dni)
      .subscribe((resp:any)=>{
        this.todasReservas = resp;
        this.todasReservas.forEach(reserva => {
          console.log(reserva.isbn);
          console.log(this.titulo);
          this.librosService.getLibros(reserva.isbn, this.titulo,'','')
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
