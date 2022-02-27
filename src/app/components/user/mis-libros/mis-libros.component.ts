import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { LibrosService } from '../../../services/libros.service';
import { PrestamosModel } from '../../../models/prestamos.models';
import { LibrosModel } from '../../../models/libros.model';
import { UsuarioModel } from '../../../models/usuarios.model';

@Component({
  selector: 'app-mis-libros',
  templateUrl: './mis-libros.component.html',
  styles: [
  ]
})
export class MisLibrosComponent implements OnInit {

    usuario!:UsuarioModel;
    todosPrestamos: PrestamosModel[] = [];
    prestamos: PrestamosModel[] = [];
    leidos:PrestamosModel[] =[];
    libros:LibrosModel[]=[];
    librosLeidos:LibrosModel[]=[];

   constructor(private usuarioService:UsuarioService, private librosService:LibrosService) {
   }

   getCategorias(libro:LibrosModel){
    this.librosService.getCategoriasLibro(libro.isbn,'')
    .subscribe((resp:any)=>{
      libro.categorias = resp;
    });
   }

   getAutores(libro:LibrosModel){
    this.librosService.getAutoresLibro(libro.isbn,'') 
    .subscribe((resp:any)=>{
        libro.autores=resp;
      });
   }

   getFechas(libro: LibrosModel){
      this.usuarioService.getPrestamo(libro.isbn, this.usuario.dni)
        .subscribe((resp:any)=>{
          libro.fechaPrestamo = resp[0].fechaPrestamo;
          libro.fechaEntrega = resp[0].fechaEntrega;
          libro.fechaDevolucion = resp[0].fechaDevolucion;
          libro.fechaInvalida = resp[0].fechaInvalida;
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
    let id=localStorage.getItem("idUsuario");

    if (id!=null){
      this.usuarioService.getUsuario(id,'','','99') //Busca el usuario
        .subscribe((resp:any)=>{
          this.usuario = resp[0];
          this.usuarioService.getPrestamo('',this.usuario.dni)  //Busca prestamos
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
                      this.getAutores(libro);
                      this.getCategorias(libro);
                      this.getFechas(libro);
                    });
                    this.libros.sort();
                });
            });
            this.leidos.forEach(leido => {
              this.librosService.getLibros(leido.isbn,'','','') //Busca los datos del libro leído
                .subscribe((resp:any)=>{
                    this.librosLeidos.push(resp[0]);
                    this.librosLeidos.forEach(libro => {
                      this.getAutores(libro);
                      this.getCategorias(libro);
                      this.getFechas(libro);
                    });
                    this.librosLeidos.sort();
                });
            });
            
          });
        });
    }
      

  }

    

  
  

}
