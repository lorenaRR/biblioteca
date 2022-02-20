
export class PrestamosModel {
    id_prestamo:string = '';
    isbn:string ='';
    dni:string = '';
    fechaPrestamo: Date = new Date();
    fechaEntrega: Date = new Date();
    fechaDevolucion:Date = new Date();
    fechaInvalida:boolean = false;
    nombre:string = '';
    apellidos:string = '';
    titulo:string = '';
}