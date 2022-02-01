import { Component, OnInit } from '@angular/core';
import { LibrosModel } from '../../../models/libros.model';
import { AutoresLibrosModel, AutoresModel } from '../../../models/autores.model';
import { LibrosService } from '../../../services/libros.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-gestion-libros',
  templateUrl: './gestion-libros.component.html',
  styleUrls: ['./gestion-libros.component.css']
})
export class GestionLibrosComponent implements OnInit {

  libros: LibrosModel[] = [];
  todosLibros: LibrosModel[] = [];

  isbn!: string;
  titulo!: string;
  subtitulo!: string;
  editorial!: string;
  autor!: string;

 
  constructor(private librosService:LibrosService)  {
   }


  ngOnInit(): void {
  }


  verLibros(){
    this.libros=[];
    if (this.isbn==null){
      this.isbn="";
    }
    if (this.titulo==null){
      this.titulo="";
    }
    if (this.subtitulo==null){
      this.subtitulo="";
    }
    if (this.editorial==null){
      this.editorial="";
    }
    if (this.autor==null){
      this.autor="";
    }

    let librosBusqueda:LibrosModel[];
    this.librosService.getLibros(this.isbn,this.titulo,this.subtitulo,this.editorial) //Busca en tabla libros
      .subscribe((resp:any)=>{
        librosBusqueda=resp;
        librosBusqueda.forEach(libroBusqueda => {
          this.librosService.getAutoresLibro(libroBusqueda.isbn,'') //Busca en tabla aut-libros 
            .subscribe((resp:any)=>{
              let autores_libro:AutoresLibrosModel[];
              autores_libro=resp;
              autores_libro.forEach(e => {
                this.librosService.getAutoresUnCampo(this.autor) //Busca en tabla autores
                  .subscribe((resp:any)=>{
                    let autores:AutoresModel[];
                    autores=resp;
                    autores.forEach(autor => {
                      if(e.id_autor==autor.id_autor){ 
                        this.libros.push(libroBusqueda);  //Añade el libro
                      }
                    });
                  });
              });
            });
        });

      });
  }

  borrarLibro(isbn:string){
    this.librosService.deleteLibro(isbn)
    .subscribe((resp:any)=>{
      swal(resp.Estado);
    });
  }


}
