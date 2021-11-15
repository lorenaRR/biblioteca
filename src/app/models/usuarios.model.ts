
export class UsuarioModel{
    nombre!:string;
    apellidos!:string;
    dni!:string;
    direccion!: {
        calle: string;
        ciudad: string;
    };
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