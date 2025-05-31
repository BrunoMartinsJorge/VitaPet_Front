import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

interface StepModel {
  label: string;
  icon?: string;
  active: boolean;
}

@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.css',
})
export class StepsComponent {
  @Input() steps: StepModel[] = [];
  @Input() clicavel: boolean = false;
  @Output() selecionarOpcao = new EventEmitter<string>();
  get activeIndex(): number {
    return this.steps.findIndex((step) => step.active);
  }

  selecionar(step: StepModel) {
    let i = this.steps.findIndex((stepA) => stepA.label == step.label);
    for (let index = 0; index < this.steps.length; index++) {
      if (this.steps[index].active) this.steps[index].active = false;
    }
    this.steps[i].active = true;
    this.selecionarOpcao.emit(step.label);
  }
}
