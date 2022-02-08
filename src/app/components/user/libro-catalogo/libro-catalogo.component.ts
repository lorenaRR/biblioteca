import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibrosService } from '../../../services/libros.service';
import { LibrosModel } from '../../../models/libros.model';
import { ReservasModel } from '../../../models/reservas.model';
import { UsuarioService } from '../../../services/usuario.service';
import swal from 'sweetalert';


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
    this.librosService.getLibros(id,'','','')
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
    let yaReservado=false;
    this.usuarioService.getReserva('',this.usuarioService.currentUser.dni)
      .subscribe((resp:any)=>{
        let res_usu:ReservasModel[];
        res_usu=resp;
        res_usu.forEach(r => {
          if(r.isbn==this.reserva.isbn){
            yaReservado=true;
            swal("Ya ha reservado este libro")
          }
          else{
            this.usuarioService.postReserva(this.reserva)
            .subscribe((resp:any)=>{
              console.log(resp.Estado);
              this.usuarioService.getReserva(this.libro.isbn,'')
              .subscribe((resp:any)=>{
                  this.reservasLibro = resp;
                  this.num_cola = this.reservasLibro.length-1;
                  swal(resp.Estado);
              });
            });
          }
        });
      });
    
      
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
