export class CategoriasModel {
    id_categoria!:string;
    categoria!:string;
}

export class CategoriasLibrosModel {
    id_categoria_libro?:string;
    id_categoria!:string;
    isbn!:string;
}

export class ListaLibrosCategorias{
    categoria!: string;
    Total!: number;
}