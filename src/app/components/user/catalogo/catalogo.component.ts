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

  noLibros = false;

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



buscar(){
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
      }
      else{
        this.noLibros=true;
      }
      
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

