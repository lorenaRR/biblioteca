import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../models/usuarios.model';
import { UsuarioService } from '../../../services/usuario.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import swal from 'sweetalert';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public usuario!:UsuarioModel;

  formaUsu!:FormGroup;
  formaPass!:FormGroup;
  passwordNoValido = false;

  constructor(private formBuilder:FormBuilder, private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.usuario=this.usuarioService.currentUser;
    this.crearFormularioUser();
    this.crearFormularioPass();
    this.formaUsu.controls.user.setValue(this.usuario.usuario);
  }


  crearFormularioUser(){
    this.formaUsu=this.formBuilder.group({
      user:['']
    })
  }

  crearFormularioPass(){
    this.formaPass=this.formBuilder.group({
      pass:[''],
      pass2:[''],
      new:['']
    })
  }

  actualizarUser(){
    this.usuario.usuario = this.formaUsu.controls.user.value;
    this.usuarioService.putUsuario(this.usuario)
          .subscribe((resp:any)=>{
            swal(resp.Estado);
      }) ;
  }

  actualizarPass(){
      if (this.formaPass.controls.pass.value == this.formaPass.controls.pass2.value && this.usuario.password == this.formaPass.controls.pass.value && this.formaPass.controls.new.value != null) {
        this.usuario.password = this.formaPass.controls.new.value;
        this.usuarioService.putUsuario(this.usuario)
          .subscribe((resp:any)=>{
          swal(resp.Estado);
      }) ;
      }
      else{
        this.passwordNoValido = true;
      }
  }

  verPass(){
   
  }
}
