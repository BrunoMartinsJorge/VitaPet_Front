import { Component, Input } from '@angular/core';
import { OpcaoInputComponent } from '../../../shared/opcao-input/opcao-input.component';
import {
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../shared/input/input.component';
import { InputArquivoComponent } from '../../../shared/input-arquivo/input-arquivo.component';

@Component({
  selector: 'app-formulario-complementares',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputArquivoComponent,
  ],
  templateUrl: './formulario-complementares.component.html',
  styleUrl: './formulario-complementares.component.css',
})
export class FormularioComplementaresComponent {
  @Input() formulario!: FormGroup;
}
