import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
  styleUrl: './steps.component.css'
})
export class StepsComponent {
  @Input() steps: StepModel[] = [];

  get activeIndex(): number {
    return this.steps.findIndex(step => step.active);
  }
}
