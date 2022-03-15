import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  user!:string;
  pass!:string;
  idUsuario!:string;
  
  constructor(private usuarioService:UsuarioService, private router:Router) {

   }

  ngOnInit(): void {
  }

  

 comprobar(){

    //localStorage.setItem("usuario", this.currentUser)    
    //localStorage.getItem("usuario");

    this.usuarioService.login(this.user,this.pass)
      .subscribe((resp:any)=>{
        if(resp.length>0 && this.user != null && this.pass !=null){
          this.usuarioService.currentUser=resp[0];
          this.idUsuario=resp[0].dni;
          localStorage.setItem("idUsuario", this.idUsuario);
          if (this.usuarioService.currentUser.admin){
            this.router.navigate(['/gestion-libros']);
          }
          else{
            this.router.navigate(['/user']);
          }
        }
        else{
          swal("El usuario o la contraseña son incorrectos");
        }
      });
    
  }  

}
