import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AutoresModel } from 'src/app/models/autores.model';
import { LibrosService } from '../../../services/libros.service';
import { ActualizarLibroComponent } from '../../admin/actualizar-libro/actualizar-libro.component';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit {

  formaAutores!:FormGroup;
  autores: AutoresModel[] = [];
  listaAutores: AutoresModel[] = [];
  cambioAut=false;
  noAutores = false;

  constructor(private formBuilder:FormBuilder, private librosService:LibrosService,private actualizarLibroComponent:ActualizarLibroComponent) { 
    this.crearFormulario();
  }

  crearFormulario(){
    this.formaAutores = this.formBuilder.group({
      nombre:[''],
      apellidos:['']
    });
  }

  ngOnInit(): void {
  }

  buscarAutor(){
    this.librosService.getAutores('',this.formaAutores.controls.nombre.value, this.formaAutores.controls.apellidos.value)
      .subscribe(resp=>{
      this.listaAutores = resp;
      if (this.listaAutores.length==0){
        this.noAutores=true;
      }
      });
  }

  insertarAutor(){ //Insertar Autor nuevo
    let autor = new AutoresModel;
    autor.nombre = this.formaAutores.controls.nombre.value;
    autor.apellidos = this.formaAutores.controls.apellidos.value;

    this.librosService.postAutores(autor)
      .subscribe((resp:any)=>{
        console.log(resp);
      });
  }

  insertarAutorLibro(id_autor:string){ 
    console.log(id_autor);
    this.actualizarLibroComponent.insertarAutorLibro(id_autor);
  }

  borrarAutor(id_autor:string){ 
    this.librosService.deleteAutor(id_autor)
        .subscribe((resp:any)=>{
          console.log(resp.Estado);
        });
  }

 




}
