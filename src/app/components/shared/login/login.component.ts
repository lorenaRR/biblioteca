import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioModel } from '../../../models/usuarios.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {



    forma!: FormGroup; 
    usuarios: UsuarioModel[] = [];
    usuarioNoValido:boolean = false;
    passwordNoValido:boolean = false;
    cnt=0;
    cnt2=0;
 

  constructor(private formBuilder:FormBuilder, private usuarioService:UsuarioService, private router:Router) {
    this.crearFormulario();
    this.getUsuarios();
   }

  ngOnInit(): void {
  }

  
  crearFormulario(){
    this.forma=this.formBuilder.group({
        usuario:['', [Validators.required]], 
        password:['',[Validators.required]]
        });
  }

  getUsuarios(){//Sacar todos los usuarios
    this.usuarioService.getUsuario('','','','99') 
    .subscribe((resp:any)=>{
        this.usuarios = resp;
    });
  }

  comprobar(){

    this.usuarios.forEach(usuario => { //Comporbar usuario
      if (usuario.usuario == this.forma.controls.usuario.value){
        this.cnt++;
        this.usuarioService.login(this.forma.controls.usuario.value, this.forma.controls.password.value)
          .subscribe((resp:any)=>{
            this.usuarioService.currentUser = resp[0];  
            if (this.usuarioService.currentUser.password == this.forma.controls.password.value) //Comprobar contraseña
              {
                this.cnt2++;
                if (this.usuarioService.currentUser.admin) {
                  this.router.navigate(['/admin']);
                }
                else{
                  this.router.navigate(['/user']);
                }   

             }  
          });
      }
    });

    if (this.cnt==0){
      this.usuarioNoValido=true;
      this.cnt2++;
    }
    if (this.cnt2==0){
      this.passwordNoValido=true;
    }
    
  }  

}
