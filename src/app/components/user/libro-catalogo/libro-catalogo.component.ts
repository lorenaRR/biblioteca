import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibrosService } from '../../../services/libros.service';
import { LibrosModel } from '../../../models/libros.model';
import { ReservasModel } from '../../../models/reservas.model';
import { UsuarioService } from '../../../services/usuario.service';
import swal from 'sweetalert';
import { UsuarioModel } from '../../../models/usuarios.model';


@Component({
  selector: 'app-libro-catalogo',
  templateUrl: './libro-catalogo.component.html',
  styleUrls: ['./libro-catalogo.component.css']
})
export class LibroCatalogoComponent implements OnInit  {

  constructor(private activatedRoute: ActivatedRoute, private librosService:LibrosService, private usuarioService:UsuarioService) { 
    
  }

  usuario!:UsuarioModel;
  libro: LibrosModel = new LibrosModel;
  reserva: ReservasModel = new ReservasModel;
  reservasLibro: ReservasModel[] = [];
  num_cola!: number;

  ngOnInit(): void {
    const {id} = this.activatedRoute.snapshot.params;
    this.librosService.getLibros(id,'','','')
    .subscribe(resp=>{
      this.libro=resp[0];
      this.getNumReservas();
    })

  }


  insertarReserva(){
    

    let id=localStorage.getItem("idUsuario");
    if (id!=null){
      this.usuarioService.getUsuario(id,'','','99') //Buscar usuario
        .subscribe((resp:any)=>{
          this.usuario = resp[0];

          this.reserva.isbn = this.libro.isbn;
          this.reserva.dni = this.usuario.dni;
          this.reserva.fecha_reserva = new Date();

          this.usuarioService.getReserva(this.libro.isbn,this.usuario.dni) //Buscar reserva
            .subscribe((resp:any)=>{
              if(resp.length>0){
                swal("Ya ha reservado este libro.");
              }
              else{
                this.usuarioService.postReserva(this.reserva) //Añadir reserva si no estaba previamente reservado
                  .subscribe((resp:any)=>{
                    swal(resp.Estado);
                    this.getNumReservas();
                  });
              }
            });

      });
    }
  }

  getNumReservas(){
    this.num_cola=0;
    let id=localStorage.getItem("idUsuario");
    this.usuarioService.getReserva(this.libro.isbn,'')
      .subscribe((resp:any)=>{
        let reservas:ReservasModel[];
        reservas= resp;
        reservas.forEach(r => {
          if (r.dni != id){
              this.num_cola++;
          }
          else{
            return;
          }
        });
        
      });
  }

  getImagen(libro:LibrosModel){
    if (libro.imagen!='') {  
      return `${libro.imagen}`
    }
    else{
      return '../assets/no-image.jpg'
    }
  }

}
