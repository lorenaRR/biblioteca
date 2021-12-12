import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../../interfaces/libros-response';
import { LibrosService } from '../../../services/libros.service';
import { LibroResponse } from '../../../interfaces/libro-response';

@Component({
  selector: 'app-libro-catalogo',
  templateUrl: './libro-catalogo.component.html',
  styleUrls: ['./libro-catalogo.component.css']
})
export class LibroCatalogoComponent {

  /*constructor(private activatedRoute: ActivatedRoute, private librosService:LibrosService) { }
  libro!:LibroResponse;

  ngOnInit(): void {
    const {id} = this.activatedRoute.snapshot.params;
    this.librosService.getLibro(id)
    .subscribe(resp=>{
      this.libro=resp;
      console.log(this.libro);
    })

  }

  getImagen(libro:LibroResponse){
    if (libro.volumeInfo.imageLinks?.medium) {
      return `${libro.volumeInfo.imageLinks?.medium}`
    }
    else{
      return '../assets/no-image.jpg'
    }
  }*/

}
