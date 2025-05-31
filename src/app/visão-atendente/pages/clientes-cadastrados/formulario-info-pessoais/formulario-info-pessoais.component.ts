import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GeneroENUM } from '../../../../models/EnumGenero.model';
import { DropdownComponent } from '../../../../shared/components/dropdown/dropdown.component';
import { InputComponent } from '../../../../shared/components/input/input.component';

@Component({
  selector: 'app-formulario-info-pessoais',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, FormsModule, DropdownComponent],
  templateUrl: './formulario-info-pessoais.component.html',
  styleUrl: './formulario-info-pessoais.component.css'
})
export class FormularioInfoPessoaisComponent {
  @Input() formulario!: FormGroup;

  opSelec: any = { label: '', value: '' };
  genero: any = [
    { label: 'Masculino', value: GeneroENUM.Masculino },
    { label: 'Feminino', value: GeneroENUM.Feminino },
  ];

  selecionar(opcao: any) {
    this.opSelec.push(opcao);
    this.formulario.get('genero')?.setValue(opcao.value);
  }
}
