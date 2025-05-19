import { Component, Input } from '@angular/core';
import { InputComponent } from "../../../shared/input/input.component";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from "../../../shared/dropdown/dropdown.component";
import { GeneroENUM } from '../../../models/EnumGenero.model';

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
