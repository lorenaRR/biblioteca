import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibrosService } from '../../../services/libros.service';
import { LibroResponse } from '../../../interfaces/libro-response';
import { LibrosModel } from '../../../models/libros.model';

@Component({
  selector: 'app-libro-catalogo',
  templateUrl: './libro-catalogo.component.html',
  styleUrls: ['./libro-catalogo.component.css']
})
export class LibroCatalogoComponent implements OnInit  {

  constructor(private activatedRoute: ActivatedRoute, private librosService:LibrosService) { }
  libro!:LibrosModel;

  ngOnInit(): void {
    const {id} = this.activatedRoute.snapshot.params;
    console.log(id);
    this.librosService.getLibros(id,'','','','')
    .subscribe(resp=>{
      console.log(resp);
      this.libro=resp[0];
      console.log(this.libro);
    })

  }

  getImagen(libro:LibrosModel){
    if (libro.imagen!='') {  //Aquí salta un error!!!
      return `${libro.imagen}`
    }
    else{
      return '../assets/no-image.jpg'
    }
  }

}
