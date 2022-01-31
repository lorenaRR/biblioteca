import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibrosModel } from '../../../models/libros.model';
import { AutoresModel } from '../../../models/autores.model';
import { LibrosService } from '../../../services/libros.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-gestion-libros',
  templateUrl: './gestion-libros.component.html',
  styleUrls: ['./gestion-libros.component.css']
})
export class GestionLibrosComponent implements OnInit {

  forma!: FormGroup;
  libros!: LibrosModel[];
  autores!: AutoresModel[];

 
  constructor(private formBuilder:FormBuilder, private librosService:LibrosService)  {
    this.crearFormulario();
   }


  ngOnInit(): void {
  }

  crearFormulario(){
    this.forma=this.formBuilder.group({
      isbn:['', [Validators.required]],
      titulo:['', [Validators.required]],
      subtitulo:['', [Validators.required]],
      autor:['', [Validators.required]],
      editorial:['', [Validators.required]],
    })
  }

  verLibros(){
    this.librosService.getLibros(this.forma.controls.isbn.value, this.forma.controls.titulo.value,this.forma.controls.subtitulo.value,
                      this.forma.controls.editorial.value)
              .subscribe(resp=>{
                this.libros = resp;
              })
  }

  borrarLibro(isbn:string){
    this.librosService.deleteLibro(isbn)
    .subscribe((resp:any)=>{
      swal(resp.Estado);
    })
  }


}
