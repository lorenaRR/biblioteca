import { Component, OnInit } from '@angular/core';
import { LibrosModel } from '../../../models/libros.model';
import { AutoresLibrosModel, AutoresModel } from '../../../models/autores.model';
import { LibrosService } from '../../../services/libros.service';
import swal from 'sweetalert';
import { CategoriasLibrosModel, CategoriasModel } from 'src/app/models/categorias.model';

@Component({
  selector: 'app-gestion-libros',
  templateUrl: './gestion-libros.component.html',
  styleUrls: ['./gestion-libros.component.css']
})
export class GestionLibrosComponent implements OnInit {

  libros: LibrosModel[] = [];
  categorias:string[]=[];

  click=false;//para controlar si ha iniciado una busqueda;

  isbn!: string;
  titulo!: string;
  subtitulo!: string;
  editorial!: string;
  autor!: string;
  categoria="TODAS LAS CATEGORIAS";
  categoria2!:string;

 
  constructor(private librosService:LibrosService)  {
    this.cargarCategorias();
   }



  ngOnInit(): void {
  }

  cargarCategorias(){
    this.librosService.getCategorias('', '')
      .subscribe((resp)=>{
        this.categorias.push('TODAS LAS CATEGORIAS');
        resp.forEach(categoria => {
          this.categorias.push(categoria.categoria);
        }); 
      });
  }

  verLibros(){
    this.click = true;

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
    if(this.categoria=="TODAS LAS CATEGORIAS"){
      this.categoria2="";
    }
    else{
      this.categoria2=this.categoria;
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
              autores_libro.forEach(aut_libro => {
                this.librosService.getAutoresUnCampo(this.autor) //Busca en tabla autores
                  .subscribe((resp:any)=>{
                    let autores:AutoresModel[];
                    autores=resp;
                    autores.forEach(autor => { 
                      if(aut_libro.id_autor==autor.id_autor){ 
                        this.librosService.getCategoriasLibro(libroBusqueda.isbn, '') //Busca en tabla cat-libros
                          .subscribe((resp:any)=>{
                            let categorias_libros:CategoriasLibrosModel[];
                            categorias_libros=resp;
                            categorias_libros.forEach(cat_libro => {
                              this.librosService.getCategorias(cat_libro.id_categoria, this.categoria2)//Busca en tabla categorias
                                .subscribe((resp:any)=>{
                                  let categorias:CategoriasModel[];
                                  categorias=resp;
                                  categorias.forEach(categoria => {
                                    if(cat_libro.id_categoria==categoria.id_categoria && !this.libros.includes(libroBusqueda)){
                                      this.libros.push(libroBusqueda);  //Añade el libro
                                    }
                                  });
                                });
                            });
                          });
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
