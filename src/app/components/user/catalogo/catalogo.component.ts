import { Component, OnInit } from '@angular/core';
import { Item } from '../../../interfaces/libros-response';
import { LibrosService } from '../../../services/libros.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

public libros:Item[]=[];


  constructor(private librosService:LibrosService) { }

  ngOnInit(): void {
    this.librosService.getLibros()
        .subscribe(resp=>{
          this.libros=resp.items;
          console.log(this.libros);
        })
  }

}
