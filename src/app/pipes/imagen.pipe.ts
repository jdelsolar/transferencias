import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../../config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    const imagen = "http://www.123depositos.com/transferencias_rest/uploads/" + value;
    return imagen;
  }

}
