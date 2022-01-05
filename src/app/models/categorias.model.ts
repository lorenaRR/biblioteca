export class CategoriasModel {
    id_categoria!:string;
    categoria!:string;
}

export class CategoriasLibrosModel {
    id?:string;
    id_categoria!:string;
    isbn!:string;
}