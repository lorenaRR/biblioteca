import { LibrosService } from '../services/libros.service';

export class UsuarioModel{
    nombre!:string;
    apellidos!:string;
    dni!:string;
    direccion!: string;
    telefono!:string;
    admin!:boolean;
    email!:string;
    usuario!:string;
    password!:string;
    libros!:LibrosService[];
    fechaNacimiento!:Date;
}