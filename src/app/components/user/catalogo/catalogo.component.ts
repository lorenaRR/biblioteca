import { Component, OnInit } from '@angular/core';
import { Item } from '../../../interfaces/libros-response';
import { LibrosService } from '../../../services/libros.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})




export class CatalogoComponent implements OnInit {

public libros:Item[]=[];
forma!: FormGroup;

public busqueda='';

buscar(){
  console.log(this.forma.controls.busqueda.value);
  this.libros=[];
  this.busqueda=this.forma.controls.busqueda.value;
  this.librosService.getLibros(this.busqueda)
  .subscribe(resp=>{
    this.libros=resp.items;
    console.log(this.libros);
  })

}

constructor(private librosService:LibrosService, private formBuilder:FormBuilder) { 
  this.crearFormulario();
}

  ngOnInit(): void {


   this.librosService.getLibros('')
        .subscribe(resp=>{
          this.libros=resp.items;
          console.log(this.libros);
        })
  }

  crearFormulario(){
    this.forma=this.formBuilder.group({
        busqueda:['', [Validators.required]]
        });
  }

}


