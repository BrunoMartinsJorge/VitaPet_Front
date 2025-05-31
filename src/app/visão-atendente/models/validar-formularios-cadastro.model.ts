import {
  AbstractControl,
  EmailValidator,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { cpf } from 'cpf-cnpj-validator';

export const validarFormularioInfoPessoais: ValidatorFn = (
  form: AbstractControl
): ValidationErrors | null => {
  const grupo = form as FormGroup;

  const nome = grupo.get('nome')?.value;
  const cpf_cliente = grupo.get('cpf')?.value;
  const telefone = grupo.get('telefone')?.value;
  const email = grupo.get('email')?.value;
  const dataNascimento = grupo.get('dataNascimento')?.value;
  const genero = grupo.get('genero')?.value;

  if (!cpf.isValid(cpf_cliente)) {
    return { cpfInvalido: true };
  }

  return null;
};

export function somenteEspacosValidator(
  control: AbstractControl
): ValidationErrors | null {
  const valor = control.value || '';
  return valor.trim().length === 0 && valor.length > 0
    ? { somenteEspacos: true }
    : null;
}

export function emailValidator(
  control: AbstractControl
): ValidationErrors | null {
  const email = control.value;
  if (!email || email.trim() === '') {
    return { campoVazio: true };
  }

  const pattern_p1 = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const pattern_p2 = /^^(?!.*\.\.)[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!pattern_p1.test(email) || !pattern_p2.test(email)) {
    return { emailInvalido: true };
  }

  return null;
}

export function dataNascimentoValida(
  control: AbstractControl
): ValidationErrors | null {
  const valor = control.value;
  if (!valor) return null;

  const data = new Date(valor);
  const hoje = new Date();
  const idadeMinima = new Date();
  idadeMinima.setFullYear(hoje.getFullYear() - 120);
  const idadeMaxima = new Date();
  idadeMaxima.setFullYear(hoje.getFullYear() - 18);

  if (data > hoje) {
    return { dataFutura: true };
  }

  if (data < idadeMinima) {
    return { idadeMuitoAlta: true };
  }

  if (data > idadeMaxima) {
    return { idadeMinima: true };
  }

  return null;
}
