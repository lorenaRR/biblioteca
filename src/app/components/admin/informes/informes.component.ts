import { Component, OnInit } from '@angular/core';
import { LibrosModel } from '../../../models/libros.model';
import { UsuarioModel } from '../../../models/usuarios.model';
import { DatePipe } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';
import { LibrosService } from '../../../services/libros.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  libros: LibrosModel[] = [];
  usuarios: UsuarioModel[] = [];
  informes: string[] = ["Fechas Nacimiento Usuarios", "Categorias","Libros No Devueltos"];
  informe!:string;
  fecha1!: Date;
  fecha2!: Date;
  iNacimientos=false;
  iCategorias=false;
  iNoDevueltos=false;

  constructor(private usuarioService:UsuarioService, private librosService:LibrosService) { }

  ngOnInit(): void {
  }

  verFormulario(){
    switch (this.informe) {
      case "Fechas Nacimiento Usuarios":
        this.iNacimientos=true;
        this.iCategorias=false;
        this.iNoDevueltos=false;
        
        break;
      case "Categorias":
        this.iNacimientos=false;
        this.iCategorias=true;
        this.iNoDevueltos=false;
        
        break;
      case "Libros No Devueltos":
        this.iNacimientos=false;
        this.iCategorias=false;
        this.iNoDevueltos=true;
        this.verNoDevueltos();
        
        break;
    
      default:
        break;
    }
  }

  verFechaNacimiento(){
    this.usuarioService.getFechaNacimiento(this.fecha1,this.fecha2)
      .subscribe((resp:any)=>{
          this.usuarios=resp;
      });
  }

  verNoDevueltos(){
    this.librosService.getNoDevueltos()
      .subscribe((resp:any)=>{
        this.libros=resp;
      });
  }

}
