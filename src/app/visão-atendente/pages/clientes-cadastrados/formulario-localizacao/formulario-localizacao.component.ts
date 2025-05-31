import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CepService } from '../../../../services/cep.service';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { BotaoComponent } from '../../../../shared/components/botao/botao.component';

@Component({
  selector: 'app-formulario-localizacao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, BotaoComponent],
  templateUrl: './formulario-localizacao.component.html',
  styleUrl: './formulario-localizacao.component.css'
})
export class FormularioLocalizacaoComponent {
  @Input() formulario!: FormGroup;

  constructor(private servico_cep: CepService) { }

  buscarCep(cep: string) {
    if (cep.length < 8) return;
    this.servico_cep.buscarEnderecoPeloCep(cep).subscribe({
      next: (res) => {
        this.formulario.value.cep = cep;
        this.formulario.value.bairro = res.bairro;
        this.formulario.value.rua = res.logradouro;
        this.formulario.patchValue({
          bairro: res.bairro,
          rua: res.logradouro,
          cep: cep
        });
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
