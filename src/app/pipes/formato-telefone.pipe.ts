import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoTelefone',
  standalone: true,
})
export class FormatoTelefonePipe implements PipeTransform {
  transform(value: string | undefined, ...args: unknown[]): string | undefined {
    if (typeof value != 'string') return value;
    const telefone = value.replace(/\D/g, '');
    if (telefone.length === 11) {
      return `(${telefone.substring(0, 2)}) ${telefone.substring(
        2,
        7
      )}-${telefone.substring(7, 11)}`;
    } else if (telefone.length === 10) {
      return `(${telefone.substring(0, 2)}) ${telefone.substring(
        2,
        6
      )}-${telefone.substring(6, 10)}`;
    } else {
      return telefone;
    }
  }
}
