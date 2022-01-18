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
librosTemp: LibrosModel [] = [];

categoria_libro: CategoriasModel = new CategoriasModel;
categoriasLibro:CategoriasModel[]=[];

autor_libro: LibrosModel = new LibrosModel;
autoresLibro:LibrosModel[]=[];

isbnTemp: string = '';
forma!: FormGroup;

constructor(private librosService:LibrosService, private formBuilder:FormBuilder, private router:Router) { 
  this.crearFormulario();
}

ngOnInit(): void {

}


 crearFormulario(){
    this.forma=this.formBuilder.group({
        titulo:['', [Validators.required]],
        subtitulo:['', [Validators.required]],
        autor:['', [Validators.required]],
        editorial:['', [Validators.required]],
        isbn:['', [Validators.required]],
        });
  }

  buscar(){

    let isbn = this.forma.controls.isbn.value;
    let titulo = this.forma.controls.titulo.value;
    let subtitulo = this.forma.controls.subtitulo.value;
    let autor = this.forma.controls.autor.value;
    let editorial = this.forma.controls.editorial.value;

    console.log(this.libros);
 
    this.libros=[];
  
    this.librosService.getLibros(isbn,titulo,subtitulo,editorial,autor)
    .subscribe(resp=>{
      this.librosTemp=resp;
      this.librosTemp.forEach(libroTemp => {
          this.categoria_libro.id_categoria=libroTemp.id_categoria;
          this.categoria_libro.categoria=libroTemp.categoria;
          this.categoriasLibro.push(this.categoria_libro);
        if(libroTemp.isbn != this.isbnTemp){ 
          this.categoriasLibro.push(this.categoria_libro);
          libroTemp.categorias = this.categoriasLibro;
          this.categoriasLibro = [];
          this.libros.push(libroTemp);
          this.isbnTemp=libroTemp.isbn;      
        }
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


