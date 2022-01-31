import { AutoresModel } from './autores.model';
import { CategoriasModel } from './categorias.model';

export class LibrosModel{
    isbn!:               string;
    titulo!:             string;
    subtitulo!:          string;
    fechaPublicacion!:   Date;
    descripcion!:        string;
    nPaginas!:           number;
    imagen!:             string;
    editorial!:          string;
    stock!:              number;
    reservado!:          boolean;
    prestado!:           boolean;
    categorias!:         CategoriasModel[];
    autores!:            AutoresModel[];
    fechaPrestamo!:      Date;
    fechaEntrega!:       Date;
    fechaDevolucion!:       Date;
}

