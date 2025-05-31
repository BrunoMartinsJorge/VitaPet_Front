import { Component, Input, SimpleChanges } from '@angular/core';
import { PetsModel } from '../../../../models/Pets.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { BotaoComponent } from '../../../../shared/components/botao/botao.component';

@Component({
  selector: 'app-formulario-editar-pet',
  standalone: true,
  imports: [InputComponent, BotaoComponent],
  templateUrl: './formulario-editar-pet.component.html',
  styleUrl: './formulario-editar-pet.component.css',
})
export class FormularioEditarPetComponent {
  @Input() dados_pet!: PetsModel | null;

  formulario!: FormGroup;

  constructor() {}

  ngOnInit() {
    this.formulario = this.criarFormulario();
  }

  private criarFormulario() {
    return new FormGroup({
      nome: new FormControl(this.dados_pet?.nome, Validators.required),
      problemas_saude: new FormControl(
        this.dados_pet?.problemas_saude,
        Validators.required
      ),
      genero: new FormControl(this.dados_pet?.genero, Validators.required),
      castrado: new FormControl(this.dados_pet?.castrado, Validators.required),
      raca: new FormControl(this.dados_pet?.raca_animal, Validators.required),
    });
  }

  editarDadosPet() {
    console.log("A");
  }
}
