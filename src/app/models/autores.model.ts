export class AutoresModel {
    id_autor!:string;
    nombre!:string;
    apellidos!:string;
}

export class AutoresLibrosModel {
    id?:string;
    id_autor!:string;
    isbn!:string;
}