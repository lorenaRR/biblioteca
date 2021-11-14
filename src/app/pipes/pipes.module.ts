import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortadaPipe } from './portada.pipe';



@NgModule({
  declarations: [
    PortadaPipe
  ],
  exports:[
    PortadaPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
