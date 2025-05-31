import { Component, Input } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,

} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputArquivoComponent } from '../../../../shared/components/input-arquivo/input-arquivo.component';

@Component({
  selector: 'app-formulario-complementares',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputArquivoComponent],
  templateUrl: './formulario-complementares.component.html',
  styleUrl: './formulario-complementares.component.css',
})
export class FormularioComplementaresComponent {
  @Input() formulario!: FormGroup;
}
