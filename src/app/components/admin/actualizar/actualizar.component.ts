import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioModel } from '../../../models/usuarios.model';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import * as moment from 'moment';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  constructor(private usuarioService:UsuarioService,  private route:ActivatedRoute) { }

  usuario: any;
  id:any;

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
    this.id=this.route.snapshot.paramMap.get('id');
    this.usuarioService.getUsuario(this.id, '','','99')
      .subscribe((resp:any)=>{
        this.usuario = resp[0];
        this.usuario.dni = this.id;
        this.usuario.fechaNacimiento = moment(this.usuario.fechaNacimiento).format('YYYY-MM-DD');
      });
  }

  actualizarFormulario(){
    this.usuarioService.putUsuario(this.usuario)
      .subscribe((resp:any)=>{
        swal(resp.Estado);
      }) ;
  }

  resetear(){
    this.usuario.usuario = this.usuario.dni;
    this.usuario.password = this. usuario.email;
    this.usuarioService.putUser(this.usuario)
      .subscribe((resp:any)=>{
        swal(resp.Estado);
        this.usuarioService.putPass(this.usuario)
          .subscribe((resp:any)=>{
            swal(resp.Estado);
          });       
      });
  }




}
