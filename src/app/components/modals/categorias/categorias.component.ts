import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { CategoriasModel } from '../../../models/categorias.model';
import { LibrosService } from '../../../services/libros.service';
import { AutoresModel } from '../../../models/autores.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  @Output() addCategoria = new EventEmitter<CategoriasModel>();

  listaCategorias: CategoriasModel[] = [];
  categoria: CategoriasModel = new CategoriasModel;

  constructor(private librosService:LibrosService) { 
    this.cargarCategorias();
  }

  ngOnInit(): void {
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
    categoria.categoria=this.categoria.categoria.toUpperCase();
    this.librosService.postCategorias(categoria)
        .subscribe((resp:any)=>{
          swal(resp.Estado);
          this.cargarCategorias();
        });
  }

  insertarCategoriaLibro(categoria:CategoriasModel){
    this.addCategoria.emit(categoria);
  }

  borrarCategoria(id_categoria:string){
      this.librosService.deleteCategorias(id_categoria)
        .subscribe((resp:any)=>{
          swal(resp.Estado);
          this.cargarCategorias();
        });
  }

  

}
