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
  listaCategorias:CategoriasModel[] = [];
  autores: AutoresModel[] = [];
  listaAutores: AutoresModel[] = [];
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
      });
  
  }

  getAutoresLibro(libro:LibrosModel){
    this.librosService.getAutoresLibro(libro.isbn) 
      .subscribe((resp:any)=>{
          libro.autores=resp;
    });
  }

  getCategoriasLibro(libro:LibrosModel){
    this.librosService.getCategoriasLibro(libro.isbn)
      .subscribe((resp:any)=>{
        libro.categorias = resp;
      });
  }

  borrarAutorLibro(id_autor:string){
    this.librosService.deleteAutoresLibro(id_autor, this.libro.isbn)
      .subscribe((resp:any)=>{
        swal(resp.Estado);
      });
  }

 borrarCategoriaLibro(id_categoria:string, isbn:string){
  this.librosService.deleteCategoriasLibro(id_categoria, isbn) 
    .subscribe((resp:any)=>{
      swal(resp.Estado);
      this.getCategoriasLibro(this.libro);
    });
  }

  insertarCategoriaLibro(id_categoria:string){
    let categoria:CategoriasLibrosModel= new CategoriasLibrosModel;
    categoria.id_categoria=id_categoria;
    categoria.isbn=this.libro.isbn;
    this.librosService.postCategoriasLibro(categoria) 
      .subscribe((resp:any)=>{
        swal(resp.Estado);
        this.getCategoriasLibro(this.libro);
      });
  }

  insertarAutorLibro(id_autor:string){
    let autor:AutoresLibrosModel = new AutoresLibrosModel;
    autor.id_autor= id_autor;
    autor.isbn=this.libro.isbn;
    console.log(autor);
    this.librosService.postAutoresLibro(autor)
      .subscribe((resp:any)=>{
        swal(resp.Estado);
        this.getAutoresLibro(this.libro);
      });
  }

  actualizarLibro(){
    this.librosService.putLibro(this.libro)
      .subscribe((resp:any)=>{
          swal(resp.Estado);
      });
  }

}