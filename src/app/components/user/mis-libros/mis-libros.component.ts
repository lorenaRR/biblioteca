import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { LibrosService } from '../../../services/libros.service';
import { ListaLibros } from '../../../models/usuarios.model';
import { LibroResponse } from '../../../interfaces/libro-response';

@Component({
  selector: 'app-mis-libros',
  templateUrl: './mis-libros.component.html',
  styles: [
  ]
})
export class MisLibrosComponent implements OnInit {

  listado!:ListaLibros[];
  libros:LibroResponse[]=[];

   constructor(private usuarioService:UsuarioService, private librosService:LibrosService) {

   }

  ngOnInit(): void {


    
    this.usuarioService.usuarios.forEach(usuario => {
      if (usuario.usuario=='user') {
        console.log(usuario.listaLibros);
        this.listado=usuario.listaLibros;
        console.log(this.listado);
      }
    });



    this.listado.forEach(libro=>{
      this.librosService.getLibro(libro.id)
          .subscribe(resp=>{
            console.log(resp);
            this.libros.push(resp);
            //this.libro.volumeInfo.fechaLectura=libro.fecha;
            //this.libros.push(this.libro);
    })
    });

  }


  getImagen(libro:LibroResponse){
    if (libro.volumeInfo.imageLinks?.smallThumbnail) {
      return `${libro.volumeInfo.imageLinks?.smallThumbnail}`
    }
    else{
      return '../assets/no-image.jpg'
    }
  }

  

}
