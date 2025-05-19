import { Component } from '@angular/core';
import { InputComponent } from "../../shared/input/input.component";
import { BotaoComponent } from "../../shared/botao/botao.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastService } from '../../services/ToastService/toast.service';

@Component({
  selector: 'app-logar-conta',
  standalone: true,
  imports: [CommonModule, InputComponent, BotaoComponent, ReactiveFormsModule],
  templateUrl: './logar-conta.component.html',
  styleUrl: './logar-conta.component.css'
})
export class LogarContaComponent {
  formulario!: FormGroup;

  constructor(private rota: Router, private toasts: ToastService) {

  }

  ngOnInit() {
    this.formulario = this.criarFormulario();
  }


  criarFormulario() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required),
    });
  }

  logarNaConta() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
      localStorage.setItem('token', this.formulario.value.email);
      this.toasts.addToast({ tipo: 'success', mensagem: 'Login efetuado com sucesso!', duracao: 2000, icone: 'fa-check-circle' });
      setTimeout(() => { this.rota.navigate(['clientes-cadastrados']); location.reload(); }, 1500);
    } else {
      this.toasts.addToast({ tipo: 'error', mensagem: 'Erro ao efetuar login!', duracao: 3000, icone: 'fa-circle-exclamation' });
      alert('Preencha os campos corretamente');
    }
  }
}