import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioModel } from '../../../models/usuarios.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  constructor(private usuarioService:UsuarioService,  private route:ActivatedRoute) { }

  usuario: any;
  id:any;

  actualizarFormulario(){
    this.usuarioService.putUsuario(this.id, this.usuario)
      .subscribe((resp:any)=>{
        console.log(resp.Estado);
      }) ;
  }


  ngOnInit(): void {
    this.usuario = new UsuarioModel();
    this.id=this.route.snapshot.paramMap.get('id');
    this.usuarioService.getUsuario(this.id, '','','99')
      .subscribe((resp:any)=>{
        this.usuario = resp[0];
        this.usuario.dni = this.id;
        console.log(this.usuario);
      })
  }

}
