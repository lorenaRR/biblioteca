import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../../../services/libros.service';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {

  mensaje!:string;

  constructor(public librosService:LibrosService) { 
    this.mensaje=this.librosService.mensaje;
  }

  

  ngOnInit(): void {
  }

}
