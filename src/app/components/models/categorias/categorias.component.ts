import { Component, OnInit } from '@angular/core';
import { CategoriasModel } from '../../../models/categorias.model';
import { LibrosService } from '../../../services/libros.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AutoresModel } from '../../../models/autores.model';
import { ActualizarLibroComponent } from '../../admin/actualizar-libro/actualizar-libro.component';
import swal from 'sweetalert';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  listaCategorias: CategoriasModel[] = [];
  formaCategorias!:FormGroup;
  public categoria: CategoriasModel = new CategoriasModel;


  constructor(private librosService:LibrosService, private formBuilder:FormBuilder, private actualizarLibroComponent:ActualizarLibroComponent) { 
    this.crearFormulario();
    this.cargarCategorias();
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.formaCategorias = this.formBuilder.group({
      categoria:['']
    });
  }

  cargarCategorias(){
    this.listaCategorias = [];
    this.librosService.getCategorias('','')
        .subscribe(resp=>{
          resp.forEach(e => {
            this.listaCategorias.push(e);
          });        
        });
  }

  insertarCategoria(){
    let categoria = new CategoriasModel;
    categoria.categoria=this.formaCategorias.controls.categoria.value.toUpperCase();
    this.librosService.postCategorias(categoria)
        .subscribe((resp:any)=>{
          swal(resp.Estado);
          this.formaCategorias.reset();
          this.cargarCategorias();
        });
  }

  insertarCategoriaLibro(id_categoria:string){
    this.actualizarLibroComponent.insertarCategoriaLibro(id_categoria);
  }

  borrarCategoria(id_categoria:string){
      this.librosService.deleteCategorias(id_categoria)
        .subscribe((resp:any)=>{
          swal(resp.Estado);
          this.cargarCategorias();
        });
  }

  

}
