import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LibrosModel } from '../../../models/libros.model';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})




export class CatalogoComponent {

libros!: LibrosModel[];
forma!: FormGroup;




constructor(private librosService:LibrosService, private formBuilder:FormBuilder, private router:Router) { 
  this.crearFormulario();
}

ngOnInit(): void {


   this.librosService.getLibros('', '', '','', '')
        .subscribe(resp=>{
          this.libros=resp;
          console.log(this.libros);
        })
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

    console.log('object');
    
    this.libros=[];
  
    this.librosService.getLibros(isbn,titulo,subtitulo,editorial,autor)
    .subscribe(resp=>{
      this.libros=resp;
      console.log(this.libros);
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

  onLibroClick(libro:LibrosModel){
    console.log(libro.isbn);
    this.router.navigate(['/libro-catalogo', libro.isbn]);
  }

}


