import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../models/usuarios.model';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public user!:UsuarioModel;

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.user=this.usuarioService.currentUser;
  }
}
