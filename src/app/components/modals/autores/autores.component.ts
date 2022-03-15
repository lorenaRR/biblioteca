import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AutoresModel } from 'src/app/models/autores.model';
import swal from 'sweetalert';
import { LibrosService } from '../../../services/libros.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit {


  @Output() addAutor = new EventEmitter<AutoresModel>();

  autores: AutoresModel[] = [];
  autor: AutoresModel = new AutoresModel;
  
  listaAutores: AutoresModel[] = [];
  noAutores = false;

  constructor(private librosService:LibrosService) { 

  }


  ngOnInit(): void {
  }

  buscarAutor(){
    if (this.autor.nombre == null){
      this.autor.nombre="";
    }
    if (this.autor.apellidos == null){
      this.autor.apellidos="";
    }
    this.librosService.getAutores('',this.autor.nombre, this.autor.apellidos)
      .subscribe(resp=>{
      this.listaAutores = resp;
      if (this.listaAutores.length==0){
        this.noAutores=true;
      }
      else{
        this.noAutores=false;
      }
      });
  }

  insertarAutor(){ //Insertar Autor nuevo
    this.librosService.postAutores(this.autor)
      .subscribe((resp:any)=>{
        swal(resp.Estado);
      });
  }

  insertarAutorLibro(autor:AutoresModel){ 
    this.addAutor.emit(autor);
  }

  borrarAutor(id_autor:string){ 
    this.librosService.deleteAutor(id_autor)
        .subscribe((resp:any)=>{
          swal(resp.Estado);
          this.buscarAutor();
        });
  }

}