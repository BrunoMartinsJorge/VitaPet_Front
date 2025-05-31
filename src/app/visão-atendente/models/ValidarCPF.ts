import { AbstractControl, ValidationErrors } from '@angular/forms';
import { cpf } from 'cpf-cnpj-validator';

export function ValidarCPF(control: AbstractControl): ValidationErrors | null {
  const cpf_cliente = control.value;
  if (!cpf.isValid(cpf_cliente)) {
    return { cpfInvalido: true };
  }
  return null;
}