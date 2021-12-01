import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { LibrosService } from '../../../services/libros.service';

@Component({
  selector: 'app-mis-libros',
  templateUrl: './mis-libros.component.html',
  styles: [
  ]
})
export class MisLibrosComponent implements OnInit {



   constructor(private usuarioService:UsuarioService, private librosService:LibrosService) {

   }

  ngOnInit(): void {
  }

    
  
  

}
