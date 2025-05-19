import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface OpcaoModel {
  label: string;
  valor: string;
  icone?: string;
  disabilitado?: boolean;
}

@Component({
  selector: 'app-opcao-input',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: OpcaoInputComponent,
      multi: true
    }
  ],
  template: `
    <span>{{pergunta}}</span>
    <section class="lista-opcoes">
      <div *ngFor="let opcao of opcoes" class="opcao-group">
<input
  #input
  [style]="style"
  type="radio"
  [name]="categoria"
  [id]="opcao.valor"
  [checked]="value === opcao.valor"
  (click)="selecionarOpcao(opcao)"
  [disabled]="opcao.disabilitado"
  [value]="opcao.valor"
  (input)="onInputChange($event)"
  (blur)="onTouched()"
/>
        <i class="fa {{ icone }}" *ngIf="opcao.icone != ''"></i>
        <label [for]="opcao.valor">{{ opcao.label }}</label>
      </div>
    </section>
  `,
  styles: [
    `
      span {
        color: #606060;
        font-weight: 600;
      }

      section.lista-opcoes {
        display: flex;
        gap: 1em;
        padding: 0.5em 0;
      }

      section.lista-opcoes .opcao-group {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25em;
        align-items: center;
        justify-content: center;
        color: #606060;
        font-weight: 600;
      }

      section.lista-opcoes .opcao-group input {
        border: 1px solid #606060;
        transform: translate(0.2em, 0.12em);
      }
    `
  ]
})
export class OpcaoInputComponent implements ControlValueAccessor, OnChanges {
  @ViewChild('input') input!: ElementRef;
  @Input() pergunta: string = '';
  @Input() opcoes: OpcaoModel[] = [];
  @Input() nome: string = '';
  @Input() direcao: 'left' | 'right' = 'left';
  @Input() categoria: string = '';
  @Input() icone: string = '';
  @Input() style: string = '';
  @Input() formControlName: string = '';
  @Output() opcaoSelecionadaEvent = new EventEmitter<string>();
  @Input() value: string = '';

  onChange = (value: string) => { };
  onTouched = () => { };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  selecionarOpcao(opcao: OpcaoModel) {
    this.value = opcao.valor;
    this.onChange(this.value);
    this.opcaoSelecionadaEvent.emit(this.value);
  }

    ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && !changes['value'].firstChange) {
      this.writeValue(this.value);
    }
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }
}
