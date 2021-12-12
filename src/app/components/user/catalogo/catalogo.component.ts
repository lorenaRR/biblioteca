import { Component, OnInit } from '@angular/core';
import { Item } from '../../../interfaces/libros-response';
import { LibrosService } from '../../../services/libros.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})




export class CatalogoComponent {

public libros:Item[]=[];
forma!: FormGroup;

/*get params(){
  return {
    intitle:'',       //Returns results where the text following this keyword is found in the title.
    inauthor:'',      //Returns results where the text following this keyword is found in the author.
    inpublisher:'',   //Returns results where the text following this keyword is found in the publisher.
    subject:'',       //Returns results where the text following this keyword is listed in the category list of the volume.
    isbn:'',          //Returns results where the text following this keyword is the ISBN number.
    lccn:'',          //Returns results where the text following this keyword is the Library of Congress Control Number.
    oclc:'',          //Returns results where the text following this keyword is the Online Computer Library Center number.
    maxResults:40

  }
}*/




constructor(private librosService:LibrosService, private formBuilder:FormBuilder, private router:Router) { 
  //this.crearFormulario();
}

  /*ngOnInit(): void {


   /*this.librosService.getLibros('')
        .subscribe(resp=>{
          this.libros=resp.items;
          console.log(this.libros);
        })
  }

  crearFormulario(){
    this.forma=this.formBuilder.group({
        busqueda:['', [Validators.required]],
        titulo:['', [Validators.required]],
        autor:['', [Validators.required]],
        editorial:['', [Validators.required]],
        categoria:['', [Validators.required]],
        isbn:['', [Validators.required]],
        });
  }

  buscar(criterio:string){
  
    if (criterio.length===0) {
      return;
    }
  
    this.libros=[];
  
    this.librosService.getLibros(criterio)
    .subscribe(resp=>{
      this.libros=resp.items;
      console.log(this.libros);
    })
  
  
  }

  getImagen(libro:Item){
    if (libro.volumeInfo.imageLinks?.thumbnail) {
      return `${libro.volumeInfo.imageLinks?.thumbnail}`
    }
    else{
      return '../assets/no-image.jpg'
    }
  }

  onLibroClick(libro:Item){
    this.router.navigate(['/libro-catalogo', libro.id]);
  }*/

}


