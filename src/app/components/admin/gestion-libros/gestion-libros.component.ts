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

  noLibros=false;

  isbn!: string;
  titulo!: string;
  subtitulo!: string;
  editorial!: string;
  autor!: string;
  categoria="TODAS LAS CATEGORIAS";
  categoria2!:string;

 
  constructor(private librosService:LibrosService)  {
    this.libros = [];
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

  informarListaLibros(resp:any){
    let libro:LibrosModel = new LibrosModel();
    libro.autores = [];
    libro.categorias = [];
    let autor:AutoresModel = new AutoresModel();
    let categoria:CategoriasModel = new CategoriasModel();
    let isbnAntiguo:string;
    let autorNuevo = false;
    let categoriaNueva = true;

    isbnAntiguo = resp[0].isbn;
    libro.isbn = resp[0].isbn;
    libro.titulo = resp[0].titulo;
    libro.subtitulo = resp[0].subtitulo;
    libro.descripcion = resp[0].descripcion;
    libro.fechaPublicacion = resp[0].fechaPublicacion;
    libro.nPaginas = resp[0].nPaginas;
    libro.imagen = resp[0].imagen;
    libro.stock = resp[0].stock;
    autor.nombre = resp[0].nombre;
    autor.apellidos =  resp[0].apellidos;
    libro.autores.push(autor);
    categoria.categoria = resp[0].categoria;
    libro.categorias.push(categoria);

    

    for (let i = 1; i < resp.length; i++) {  
          autor = new AutoresModel();  
          categoria = new CategoriasModel();
          categoriaNueva = true;
          if(resp[i].isbn == isbnAntiguo){

            autor.nombre=resp[i].nombre;
            autor.apellidos=resp[i].apellidos;

            for (let j = 0; j < libro.autores.length; j++) {
              if(libro.autores[j].nombre != autor.nombre || libro.autores[j].apellidos != autor.apellidos){
                autorNuevo=true;
              } 
              else{
                autorNuevo=false;
              }
            }

            if(autorNuevo){
              libro.autores.push(autor);
            }
            

            categoria.categoria=resp[i].categoria;  

            for (let k = 0; k < libro.categorias.length; k++) {
              if(libro.categorias[k].categoria == categoria.categoria){
                categoriaNueva=false;
              }
            }
            
            if(categoriaNueva){
              libro.categorias.push(categoria);
            }  
          }
          else{
            autor = new AutoresModel();
            categoria = new CategoriasModel();
            this.libros.push(libro);
            libro = new LibrosModel();
            libro.autores = []; 
            libro.categorias = [];
            libro.isbn = resp[i].isbn;
            isbnAntiguo = resp[i].isbn;
            libro.titulo = resp[i].titulo;
            libro.subtitulo = resp[i].subtitulo;
            libro.descripcion = resp[i].descripcion;
            libro.fechaPublicacion = resp[i].fechaPublicacion;
            libro.nPaginas = resp[i].nPaginas;
            libro.imagen = resp[i].imagen;
            libro.stock = resp[i].stock;  
            autor.nombre=resp[i].nombre;
            autor.apellidos=resp[i].apellidos;
            categoria.categoria=resp[i].categoria;
            libro.autores.push(autor);
            libro.categorias.push(categoria);          
          }
    }

    this.libros.push(libro);

    if (this.libros.length==0){
      this.noLibros=true;
    }
    else{
      this.noLibros=false;
    }
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
    if(this.categoria=="TODAS LAS CATEGORIAS"){
      this.categoria2="";
    }
    else{
      this.categoria2=this.categoria;
    }

    this.librosService.getLibrosCatalogo(this.isbn,this.titulo, this.subtitulo, this.editorial, this.autor, this.categoria2)
      .subscribe((resp:any)=>{
        if(resp.length>0){
          this.informarListaLibros(resp);
          this.noLibros=false;
        }
        else{
          this.noLibros=true;
        }
        
      });
}

  borrarLibro(isbn:string){
    this.librosService.deleteLibro(isbn)
    .subscribe((resp:any)=>{
      swal(resp.Estado);
    });
  }


}
