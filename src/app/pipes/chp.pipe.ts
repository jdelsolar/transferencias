import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chp'
})
export class ChpPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    // Format the output to display any way you want here.
    // For instance:
    if (value !== undefined && value !== null) {
      return '$ ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return '';
    }
  }

}
