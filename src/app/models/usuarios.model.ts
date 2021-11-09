import { LibrosModel } from './libros.model';
export class UsuarioModel{
    nombre!:string;
    apellidos!:string;
    dni!:string;
    direccion!: {
        calle: string;
        ciudad: string;
    };
    telefono!:string;
    rol!:string;
    email!:string;
    usuario!:string;
    password!:string;
    listaLibros:LibrosModel[]=[];
    prestamos:LibrosModel[]=[];
}