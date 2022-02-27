import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { Router } from '@angular/router';
import { LibrosModel } from '../../../models/libros.model';
import { CategoriasModel, CategoriasLibrosModel } from '../../../models/categorias.model';
import { AutoresModel, AutoresLibrosModel } from '../../../models/autores.model';
import { UsuarioModel } from '../../../models/usuarios.model';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})




export class CatalogoComponent {

  usuario!:UsuarioModel;

  libros: LibrosModel[] = [];
  librosBusqueda:LibrosModel[] =[];
  categorias:string[]=[];

  click = false;

  isbn!: string;
  titulo!: string;
  subtitulo!: string;
  editorial!: string;
  autor!: string;
  categoria="TODAS LAS CATEGORIAS";
  categoria2!: string;

constructor(private librosService:LibrosService, private router:Router, private usuarioService:UsuarioService) { 
  this.getUsuario();
  this.cargarListaCategorias();
}

ngOnInit(): void {
    
}


getUsuario(){
  let id=localStorage.getItem("idUsuario");
  if (id!=null){
    this.usuarioService.getUsuario(id,'','','99')
      .subscribe((resp:any)=>{
        this.usuario = resp[0];
      });
  }
}


buscar(){
  this.libros=[];
  this.click=true;
  
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

  this.librosService.getLibros(this.isbn,this.titulo,this.subtitulo,this.editorial) //Busca en tabla libros
  .subscribe((resp:any)=>{
      this.librosBusqueda=resp;
      this.librosBusqueda.forEach(libroBusqueda => { 
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
                                  if(cat_libro.id_categoria == categoria.id_categoria && !this.libros.includes(libroBusqueda)){
                                      this.addAutores(libroBusqueda); //Cargar autores en libroBusqueda
                                      this.addCategorias(libroBusqueda); //Cargar categorias en libroBusqueda
                                      this.libros.push(libroBusqueda);  //Añade el libros
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

addAutores(libro:LibrosModel){ 
  this.librosService.getAutoresLibro(libro.isbn,'')
    .subscribe((resp:any)=>{
      let autores_libros:AutoresLibrosModel[];
      autores_libros=resp;
      autores_libros.forEach(aut_libro => {
        this.librosService.getAutores(aut_libro.id_autor,'','')
          .subscribe((resp:any)=>{
            libro.autores=resp;
          });
      });
    })


}

addCategorias(libro:LibrosModel){
  let categorias:CategoriasModel[] = [];
  this.librosService.getCategoriasLibro(libro.isbn,'')
    .subscribe((resp:any)=>{
      let categorias_libro:CategoriasLibrosModel[];
      categorias_libro=resp;
      categorias_libro.forEach(cat_libro => {
        this.librosService.getCategorias(cat_libro.id_categoria,'')
          .subscribe((resp:any)=>{
            categorias.push(resp[0]);
          });
      });
      libro.categorias=categorias;
    });
}

cargarListaCategorias(){
    this.librosService.getCategorias('', '')
      .subscribe((resp)=>{
        this.categorias.push('TODAS LAS CATEGORIAS');
        resp.forEach(categoria => {
          this.categorias.push(categoria.categoria);
        }); 
      });
  }

  getImagen(libro:LibrosModel){
    if (libro.imagen) {
      return `${libro.imagen}`
    }
    else{
      return '../assets/no-image.jpg'
    }
  }

  onLibroClick(libro:LibrosModel){
    this.router.navigate(['/libro-catalogo', libro.isbn]);
  }

}


function busquedaFinal(): unknown {
  throw new Error('Function not implemented.');
}

function b() {
  throw new Error('Function not implemented.');
}

function comprobarLibroEncontrado() {
  throw new Error('Function not implemented.');
}

