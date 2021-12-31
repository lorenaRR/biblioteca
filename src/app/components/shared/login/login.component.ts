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
    usuarioNoValido!:boolean;
    passwordNoValido!:boolean;

  constructor(private formBuilder:FormBuilder, private usuarioService:UsuarioService, private router:Router) {
    this.crearFormulario();
   }

  ngOnInit(): void {
  }

  
  crearFormulario(){
    this.forma=this.formBuilder.group({
        usuario:['', [Validators.required]], 
        password:['',[Validators.required]]
        });
  }


  comprobar(){
    this.usuarioNoValido=true;
    this.passwordNoValido=true;
    
    this.usuarioService.login(this.forma.controls.usuario.value,this.forma.controls.password.value)
                            .subscribe((resp:any)=>{
                                this.usuarioService.currentUser = resp[0];
                                console.log(this.usuarioService.currentUser);
                                if (this.usuarioService.currentUser.admin) {
                                  this.router.navigate(['/admin']);
                                }
                                else{
                                  this.router.navigate(['/user']);
                                }   
                            });   
  }

  

}
