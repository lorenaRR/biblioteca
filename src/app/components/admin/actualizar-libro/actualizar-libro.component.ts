import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibrosModel } from '../../../models/libros.model';
import { LibrosService } from '../../../services/libros.service';
import { CategoriasModel, CategoriasLibrosModel } from '../../../models/categorias.model';
import { AutoresModel, AutoresLibrosModel } from '../../../models/autores.model';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import * as moment from 'moment';
import swal from 'sweetalert';




@Component({
  selector: 'app-actualizar-libro',
  templateUrl: './actualizar-libro.component.html',
  styleUrls: ['./actualizar-libro.component.css']
})
export class ActualizarLibroComponent implements OnInit {

  libro: any;
  id:any;
  categorias: CategoriasModel[] = [];
  autores: AutoresModel[] = [];
  autores_libros: AutoresLibrosModel[] = [];
  categorias_libros: CategoriasLibrosModel[] = [];
  swal!: SweetAlert;

  constructor(private librosService:LibrosService,  private route:ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.libro = new LibrosModel();
    this.id=this.route.snapshot.paramMap.get('id');
    this.librosService.getLibros(this.id, '','','')
      .subscribe((resp:any)=>{
        this.libro = resp[0];
        this.libro.isbn = this.id;
        this.libro.fechaPublicacion = moment(this.libro.fechaPublicacion).format('YYYY-MM-DD');
        this.getAutoresLibro(this.libro);
        this.getCategoriasLibro(this.libro);
        console.log(this.libro);
      });
  
  }

  addAutor(autor: AutoresModel) {
    this.autores.push(autor);
    let autor_libro:AutoresLibrosModel = new AutoresLibrosModel;
      autor_libro.isbn = this.libro.isbn;
      autor_libro.id_autor = autor.id_autor;
      this.autores_libros.push(autor_libro);
      this.autores_libros.forEach(aut_libro => {
        this.librosService.postAutoresLibro(aut_libro)
          .subscribe((resp:any)=>{
            swal(resp.Estado);
          });
      });
  }

  addCategoria(categoria: CategoriasModel){ 
    this.categorias.push(categoria);
    let categoria_libro:CategoriasLibrosModel = new CategoriasLibrosModel;
      categoria_libro.isbn=this.libro.isbn;
      categoria_libro.id_categoria=categoria.id_categoria;
      this.categorias_libros.push(categoria_libro);
      this.categorias_libros.forEach(cat_libro => {
        this.librosService.postCategoriasLibro(cat_libro)
          .subscribe((resp:any)=>{
            swal(resp.Estado);
          });
      });
  }

  getAutoresLibro(libro:LibrosModel){
    this.librosService.getAutoresLibro(libro.isbn,'') 
      .subscribe((resp:any)=>{
        console.log(resp);
          let auts:AutoresModel[]=resp;
          auts.forEach(a => {
            this.librosService.getAutores(a.id_autor,'','')
              .subscribe((resp:any)=>{
                  this.autores.push(resp[0]);
              })
          });
    });
  }

  getCategoriasLibro(libro:LibrosModel){
    this.librosService.getCategoriasLibro(libro.isbn,'')
      .subscribe((resp:any)=>{
        this.categorias = resp;
      });
  }

  borrarAutorLibro(autor:AutoresModel){ //Borrar autor lista
    this.autores = this.autores.filter(e => e!==autor);
    this.librosService.deleteAutoresLibro(autor.id_autor, this.libro.isbn)
      .subscribe((resp:any)=>{
        swal(resp.Estado);
      });
  }

  borrarCategoriaLibro(categoria:CategoriasModel){//Borrar categoria lista
    this.categorias = this.categorias.filter(e => e!==categoria);
    this.librosService.deleteCategoriasLibro(categoria.id_categoria, this.libro.isbn) 
    .subscribe((resp:any)=>{
      swal(resp.Estado);
      this.getCategoriasLibro(this.libro);
    });
  }


  actualizarLibro(){
    this.librosService.putLibro(this.libro)
      .subscribe((resp:any)=>{
          swal(resp.Estado);
      });
  }

}