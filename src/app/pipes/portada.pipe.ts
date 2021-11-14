import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'portada'
})
export class PortadaPipe implements PipeTransform {

  transform(portada: string): string {
    //libro.volumeInfo.imageLinks?.thumbnail
    if (portada) {
      return "libro.volumeInfo.imageLinks?.thumbnail"
    }
    else{
      return "./assets/no-image.png"
    }
  }

}
