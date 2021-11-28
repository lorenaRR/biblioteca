
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
    listaLibros!:ListaLibros[];
    prestamos?:string[];
}

export class ListaLibros{
    id!: string;
    fecha!:string;
}