import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { LibrosService } from '../../../services/libros.service';
import { PrestamosModel } from '../../../models/prestamos.models';
import { LibrosModel } from '../../../models/libros.model';

@Component({
  selector: 'app-mis-libros',
  templateUrl: './mis-libros.component.html',
  styles: [
  ]
})
export class MisLibrosComponent implements OnInit {

    todosPrestamos: PrestamosModel[] = [];
    prestamos: PrestamosModel[] = [];
    leidos:PrestamosModel[] =[];
    libros:LibrosModel[]=[];
    librosLeidos:LibrosModel[]=[];

   constructor(private usuarioService:UsuarioService, private librosService:LibrosService) {

   }

   getCategorias(libro:LibrosModel){
     console.log('libro cat: ' + libro);
    this.librosService.getCategoriasLibro(libro.isbn,'')
    .subscribe((resp:any)=>{
      libro.categorias = resp;
    });
   }

   getAutores(libro:LibrosModel){
    console.log('libro aut: ' + libro);
    this.librosService.getAutoresLibro(libro.isbn,'') 
    .subscribe((resp:any)=>{
        libro.autores=resp;
      });
   }

   getFechas(libro: LibrosModel){
    console.log('libro fechas: ' + libro);
      this.usuarioService.getPrestamo(libro.isbn, this.usuarioService.currentUser.dni)
        .subscribe((resp:any)=>{
          libro.fechaPrestamo = resp[0].fechaPrestamo;
          libro.fechaEntrega = resp[0].fechaEntrega;
          libro.fechaDevolucion = resp[0].fechaDevolucion;
        })
   }

   getImagen(libro:LibrosModel){
    if (libro.imagen) {
      return `${libro.imagen}`
    }
    else{
      return '../assets/no-image.jpg'
    }
  }

  ngOnInit(): void {
      this.usuarioService.getPrestamo('',this.usuarioService.currentUser.dni)  //Busca prestamos
        .subscribe((resp:any)=>{
          this.todosPrestamos = resp;
          this.todosPrestamos.forEach(tprestamo => {
            if(tprestamo.fechaDevolucion==null){
              this.prestamos.push(tprestamo);
            }
            else{
              this.leidos.push(tprestamo);
            }
          });
          this.prestamos.forEach(prestamo => {
            this.librosService.getLibros(prestamo.isbn,'','','') //Busca los datos del libro del prestamo
              .subscribe((resp:any)=>{
                  this.libros.push(resp[0]);
                  this.libros.forEach(libro => {
                    console.log(libro);
                    this.getAutores(libro);
                    this.getCategorias(libro);
                    this.getFechas(libro);
                  });
              });
          });
          this.leidos.forEach(leido => {
            this.librosService.getLibros(leido.isbn,'','','') //Busca los datos del libro del prestamo
              .subscribe((resp:any)=>{
                  this.librosLeidos.push(resp[0]);
                  this.librosLeidos.forEach(libro => {
                    console.log(libro);
                    this.getAutores(libro);
                    this.getCategorias(libro);
                    this.getFechas(libro);
                  });
              });
          });
        });
            

        console.log(this.libros);
  }

    

  
  

}
