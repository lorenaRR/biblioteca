import { Component, OnInit } from '@angular/core';
import { LibrosModel, ListaLectores } from '../../../models/libros.model';
import { UsuarioModel } from '../../../models/usuarios.model';
import { DatePipe } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';
import { LibrosService } from '../../../services/libros.service';
import { ListaLibrosCategorias } from '../../../models/categorias.model';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  libros: LibrosModel[] = [];
  usuarios: UsuarioModel[] = [];
  lista_cat: ListaLibrosCategorias[]=[];
  lista_lect: ListaLectores[]=[];
  informes: string[] = ["Fechas Nacimiento Usuarios", "Número de Lectores por cada Categoria", "Número de Libros por cada Categoria","Libros No Devueltos", "Libros más leídos"];
  informe!:string;
  fecha1!: Date;
  fecha2!: Date;
  iNacimientos=false;
  iCategorias=false;
  iNoDevueltos=false;
  iCategoriasUsu=false;
  iLectores=false;

  constructor(private usuarioService:UsuarioService, private librosService:LibrosService) { }

  ngOnInit(): void {
  }

  verFormulario(){
    switch (this.informe) {
      case "Fechas Nacimiento Usuarios":
        this.iNacimientos=true;
        this.iCategorias=false;
        this.iNoDevueltos=false;
        this.iCategoriasUsu=false;
        this.iLectores=false;
        
        break;
      case "Número de Libros por cada Categoria":
        this.iNacimientos=false;
        this.iCategorias=true;
        this.iNoDevueltos=false;
        this.iCategoriasUsu=false;
        this.iLectores=false;
        this.verNumCategorias();
        
        break;
      case "Número de Lectores por cada Categoria":
        this.iNacimientos=false;
        this.iCategorias=false;
        this.iNoDevueltos=false;
        this.iCategoriasUsu=true;
        this.iLectores=false;
        this.verNumLectores();
      
        break;
      case "Libros No Devueltos":
        this.iNacimientos=false;
        this.iCategorias=false;
        this.iNoDevueltos=true;
        this.iCategoriasUsu=false;
        this.iLectores=false;
        this.verNoDevueltos();
        
        break;
      case "Libros más leídos":
          this.iNacimientos=false;
          this.iCategorias=false;
          this.iNoDevueltos=false;
          this.iCategoriasUsu=false;
          this.iLectores=true;
          this.verLectores();
          
          break;
      default:
        break;
    }
  }

  verFechaNacimiento(){
    this.usuarios=[];
    this.usuarioService.getFechaNacimiento(this.fecha1,this.fecha2)
      .subscribe((resp:any)=>{
          this.usuarios=resp;
      });
  }

  verNumLectores(){
    this.lista_cat=[];
    this.librosService.getNumUsuariosPorCategorias()
      .subscribe((resp:any)=>{
        this.lista_cat = resp;
      });
  }

  verNoDevueltos(){
    this.libros=[];
    this.librosService.getNoDevueltos()
      .subscribe((resp:any)=>{
        this.libros=resp;
      });
  }

  verNumCategorias(){
    this.lista_cat=[];
    this.librosService.getNumLibrosPorCategorias()
      .subscribe((resp:any)=>{
        this.lista_cat = resp;
      });
  }

  verLectores(){
    this.lista_lect=[];
    this.librosService.getNumLectores()
      .subscribe((resp:any)=>{
        this.lista_lect = resp;
      });
  }

  printDiv(id:string) { //Imprimir los informes
    let div = document.getElementById(id);
    let win = window.open('', '', 'height=700,width=700');
  
    if(win!=null && div!=null){
      win.document.write(div.outerHTML);
      var style = '<style>';
      style = style + 'tr, td {padding: 10px;text-align: left; height: 50px; vertical-align: center; }';
      style = style + '</style>';
      win.document.write(style);
      win.document.close();
      win.print();
    }

  }

}
