import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'letraFormat',
  standalone: true
})
export class LetraFormatPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    value = value.toLocaleLowerCase();
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
