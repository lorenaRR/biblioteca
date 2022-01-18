import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibrosService } from '../../../services/libros.service';
import { LibrosModel } from '../../../models/libros.model';
import { ReservasModel } from '../../../models/reservas.model';
import { UsuarioService } from '../../../services/usuario.service';


@Component({
  selector: 'app-libro-catalogo',
  templateUrl: './libro-catalogo.component.html',
  styleUrls: ['./libro-catalogo.component.css']
})
export class LibroCatalogoComponent implements OnInit  {

  constructor(private activatedRoute: ActivatedRoute, private librosService:LibrosService, private usuarioService:UsuarioService) { }
  libro: LibrosModel = new LibrosModel;
  reserva: ReservasModel = new ReservasModel;
  reservasLibro: ReservasModel[] = [];
  num_cola!: number;

  ngOnInit(): void {
    const {id} = this.activatedRoute.snapshot.params;
    console.log(id);
    this.librosService.getLibros(id,'','','','')
    .subscribe(resp=>{
      console.log(resp);
      this.libro=resp[0];
      console.log(this.libro);
    })

  }

  insertarReserva(){
    this.reserva.isbn = this.libro.isbn;
    this.reserva.dni = this.usuarioService.currentUser.dni;
    this.reserva.fecha_reserva = new Date();
    console.log(this.reserva);
    this.usuarioService.postReserva(this.reserva)
        .subscribe((resp:any)=>{
          console.log(resp.Estado);
          this.usuarioService.getReserva(this.libro.isbn,'')
          .subscribe((resp:any)=>{
              this.reservasLibro = resp;
                this.num_cola = this.reservasLibro.length-1;
          });
        })
      
  }

  getImagen(libro:LibrosModel){
    if (libro.imagen!='') {  //Aquí salta un error!!!
      return `${libro.imagen}`
    }
    else{
      return '../assets/no-image.jpg'
    }
  }

}
