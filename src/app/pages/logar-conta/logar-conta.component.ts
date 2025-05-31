import { Component } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastService } from '../../services/ToastService/toast.service';
import { BotaoComponent } from '../../shared/components/botao/botao.component';
import { UsuarioServiceService } from '../../services/usuario-service.service';

@Component({
  selector: 'app-logar-conta',
  standalone: true,
  imports: [CommonModule, InputComponent, BotaoComponent, ReactiveFormsModule],
  templateUrl: './logar-conta.component.html',
  styleUrl: './logar-conta.component.css',
})
export class LogarContaComponent {
  formulario!: FormGroup;

  constructor(
    private rota: Router,
    private toasts: ToastService,
    private service: UsuarioServiceService
  ) {}

  ngOnInit() {
    this.formulario = this.criarFormulario();
  }

  criarFormulario() {
    return new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  logarNaConta() {
    if (this.formulario.valid) {
      this.service.logarUsuario(this.formulario.value).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response);
          this.toasts.addToast({
            tipo: 'success',
            mensagem: 'Login efetuado com sucesso!',
            duracao: 2000,
            icone: 'fa-check-circle',
          });
          setTimeout(() => {
            this.rota.navigate(['clientes-cadastrados']);
            location.reload();
          }, 1500);
        },
        error: (err) => {
          this.toasts.addToast({
            tipo: 'error',
            mensagem: 'Erro ao efetuar login!',
            duracao: 3000,
            icone: 'fa-circle-exclamation',
          });
          console.error(err);
        },
      });
    } else {
      this.toasts.addToast({
        tipo: 'error',
        mensagem: 'Erro ao efetuar login!',
        duracao: 3000,
        icone: 'fa-circle-exclamation',
      });
      alert('Preencha os campos corretamente');
    }
  }
}
