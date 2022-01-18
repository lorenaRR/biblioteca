import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibrosModel } from '../../../models/libros.model';
import { LibrosService } from '../../../services/libros.service';
import { CategoriasModel, CategoriasLibrosModel } from '../../../models/categorias.model';
import { AutoresModel } from '../../../models/autores.model';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-actualizar-libro',
  templateUrl: './actualizar-libro.component.html',
  styleUrls: ['./actualizar-libro.component.css']
})
export class ActualizarLibroComponent implements OnInit {

  libro: any;
  id:any;
  formaAutores!:FormGroup;
  formaCategorias!:FormGroup;
  categorias: CategoriasModel[] = [];
  listaCategorias:CategoriasModel[] = [];
  autores: AutoresModel[] = [];
  listaAutores: AutoresModel[] = [];
  cambioCat=false;
  cambioAut=false;

  constructor(private librosService:LibrosService,  private route:ActivatedRoute, private formBuilder:FormBuilder) { 
    this.crearFormulario();
    this.cargarCategorias();
  }

  crearFormulario(){
    this.formaAutores = this.formBuilder.group({
      nombre:[''],
      apellidos:['']
    });

    this.formaCategorias = this.formBuilder.group({
      categoria:['']
    });
  }


  ngOnInit(): void {
    this.libro = new LibrosModel();
    this.id=this.route.snapshot.paramMap.get('id');
    this.librosService.getLibros(this.id,'','','','')
      .subscribe((resp:any)=>{
        this.libro = resp[0];
        this.libro.isbn = this.id;
        this.librosService.getAutoresLibro('', this.libro.isbn)
          .subscribe(resp=>{
            resp.forEach(aut_libro => {
              this.librosService.getAutores(aut_libro.id_autor,'','')
                .subscribe(resp=>{
                  this.autores.push(resp[0]);
                });
            });

            this.librosService.getCategoriasLibro('', '',this.libro.isbn)
            .subscribe(resp=>{
              resp.forEach(cat_libro => {
                this.librosService.getCategorias(cat_libro.id_categoria,'')
                  .subscribe(resp=>{
                    this.categorias.push(resp[0]);
                    console.log(this.categorias);
                  });
              });
                
            });
          })
      });
  }

  borrarAutor(id_autor:string){
    this.autores = this.autores.filter(autor => autor.id_autor != id_autor);
    this.cambioAut=true;
  }

  borrarCategoria(id_categoria:string){
    this.categorias = this.categorias.filter(categoria => categoria.id_categoria != id_categoria);
    this.cambioCat=true;
  }

  cargarCategorias(){
    this.listaCategorias = [];
    this.librosService.getCategorias('','')
        .subscribe(resp=>{
          resp.forEach(e => {
            this.listaCategorias.push(e);
          });        
        });
  }

  insertarCategoria(){
    let categoria = new CategoriasModel;
    categoria.categoria=this.formaCategorias.controls.categoria.value;
    this.librosService.postCategorias(categoria)
        .subscribe((resp:any)=>{
          console.log(resp.Estado);
          this.formaCategorias.reset();
          this.cargarCategorias();
        });
  }

  addCategoriaLibro(id_categoria:string){
    this.cambioCat=true;
    this.librosService.getCategorias(id_categoria,'')
      .subscribe(resp=>{
        console.log(resp);
      });
  }

  borrarCategoriaBD(id_categoria:string){
      this.librosService.deleteCategorias(id_categoria)
        .subscribe((resp:any)=>{
          console.log(resp.Estado);
          this.cargarCategorias();
        });
  }

  buscarAutor(){
    this.librosService.getAutores('',this.formaAutores.controls.nombre.value, this.formaAutores.controls.apellidos.value)
      .subscribe(resp=>{
      this.listaAutores = resp;
      });
  }

  insertarAutor(){
    let autor = new AutoresModel;
    autor.nombre = this.formaAutores.controls.nombre.value;
    autor.apellidos = this.formaAutores.controls.apellidos.value;

    this.librosService.postAutores(autor)
      .subscribe((resp:any)=>{
        console.log(resp);
      });
  }

  addAutorLibro(id_autor:string){

  }

  borrarAutorBD(id_autor:string){
    this.librosService.deleteAutor(id_autor)
        .subscribe((resp:any)=>{
          console.log(resp.Estado);
        });
  }

  actualizarFormulario(){
      this.librosService.putLibro(this.libro) //Actualizar libro
        .subscribe((resp:any)=>{
            console.log(resp.Estado);
            if (this.cambioCat){ //Si se cambian las categorías
              this.librosService.getCategoriasLibro('', '', this.libro.isbn)
              .subscribe(resp=>{
                  console.log('categorias libro: ' + resp);
                  resp.forEach(cat_libro => {
                    this.librosService.deleteCategoriasLibro(cat_libro.id_categoria_libro) //Borra Cat-Lib
                        .subscribe((resp:any)=>{
                          console.log(resp.Estado); 
                        });
                    this.categorias.forEach(categoria => {
                      console.log(categoria);
                      this.librosService.postCategorias(categoria)  //Inserta Nueva Cat
                        .subscribe((resp:any)=>{
                          console.log(resp.Estado);
                        });
                    });
                  });
              });
            }
            if (this.cambioAut){  //Si se cambian los autores
              
            }
      });
  }

}
