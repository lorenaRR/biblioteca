
export class PrestamosModel {
    id_prestamo!:string;
    isbn!:string;
    dni!:string;
    fechaPrestamo!: Date;
    fechaEntrega!: Date;
    fechaDevolucion!:Date;
    fechaInvalida!:boolean;
    nombre!:string;
    apellidos!:string;
    titulo!:string;
}