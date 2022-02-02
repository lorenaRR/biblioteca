import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../models/usuarios.model';
import { UsuarioService } from '../../../services/usuario.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public usuario!:UsuarioModel;


  constructor(private usuarioService:UsuarioService) { 
    this.usuario=this.usuarioService.currentUser;
  }

  ngOnInit(): void {

  }

  actualizarUser(){

  }

  actualizarPass(){

  }

  verPass(){
   
  }
}
