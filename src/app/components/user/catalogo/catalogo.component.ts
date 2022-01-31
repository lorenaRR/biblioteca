import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LibrosModel } from '../../../models/libros.model';
import { CategoriasModel } from '../../../models/categorias.model';
import { AutoresModel } from '../../../models/autores.model';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})




export class CatalogoComponent {

libros: LibrosModel [] = [];
categorias:string[] = [];

categoria_libro: CategoriasModel = new CategoriasModel;
categoriasLibro:CategoriasModel[]=[];

autor_libro: LibrosModel = new LibrosModel;
autoresLibro:LibrosModel[]=[];

isbnTemp: string = '';
forma!: FormGroup;

constructor(private librosService:LibrosService, private formBuilder:FormBuilder, private router:Router) { 
  this.crearFormulario();
  this.cargarListaCategorias();
}

ngOnInit(): void {
    
}


 crearFormulario(){
    this.forma=this.formBuilder.group({
        titulo:[''],
        subtitulo:[''],
        autor:[''],
        categorias:[''],
        editorial:[''],
        isbn:[''],
        });
  }

  buscar(){

    let isbn = this.forma.controls.isbn.value;
    let titulo = this.forma.controls.titulo.value;
    let subtitulo = this.forma.controls.subtitulo.value;
    let autor = this.forma.controls.autor.value;
    let editorial = this.forma.controls.editorial.value;
    let categoria = this.forma.controls.categorias.value;

    this.libros=[];
  
    this.librosService.getLibros(isbn,titulo,subtitulo,editorial)
    .subscribe(resp=>{
      this.libros=resp;
      this.libros.forEach(libro => {  //Recorro todos los libros
          this.getAutoresLibro(libro); //Lleno el array de autores de cada libro
          this.getCategoriasLibro(libro);          
      });
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

  cargarListaCategorias(){
    this.librosService.getCategorias('', '')
      .subscribe((resp)=>{
        this.categorias.push('TODAS');
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
    console.log(libro.isbn);
    this.router.navigate(['/libro-catalogo', libro.isbn]);
  }

}


