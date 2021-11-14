import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-mis-libros',
  templateUrl: './mis-libros.component.html',
  styles: [
  ]
})
export class MisLibrosComponent implements OnInit {


 
  constructor(private usuarioService:UsuarioService) {

   }


  ngOnInit(): void {
  }


  

}
