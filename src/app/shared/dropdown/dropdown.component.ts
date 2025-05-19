import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface OpcaoModel {
  label: string;
  valor: string;
  icone?: string;
  disabilitado?: boolean;
}

@Component({
  selector: 'dropdown-personalizado',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dropdown" [ngClass]="{ 'dropdown-aberto': dropdownAberto }">
      <span>{{span}}</span>
  <button class="dropdown-button" (click)="alterarDropdown()" [style]="style">
    <ng-container class="dropdown-label">{{ opcaoSelecionada.label != "" ? opcaoSelecionada.label : label }}</ng-container>
    <i class="fa-solid fa-chevron-down"></i>
  </button>
  <div class="dropdown-content">
    <a (click)="selecionar(opcao)" *ngFor="let opcao of opcoes">{{opcao.label}}</a>
  </div>
</div>
  `,
  styles: [
    `
span{
    font-size: 0.9rem;
  color: #606060;
}

.dropdown {
  position: relative;
  z-index: 10;
}

      .dropdown-button {
  min-width: 200px;
  width: 100%;
  height: 32px;
  background: transparent;
  color: #606060;
  border: 1px solid #606060;
  border-radius: 5px;
  padding: 10px 5px;
  cursor: pointer;
  gap: 0.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  z-index: 10000000000000000000000;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.dropdown-content a {
  width: 100%;
  border: none;
  background-color: transparent;
  color: black;
  padding: 10px 15px;
  text-decoration: none;
  text-align: start;
  display: block;
  z-index: 10000000000000000000000;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

.dropdown.dropdown-aberto .dropdown-content {
  display: block;
  position: absolute;
  z-index: 10000000000000000000000;
}
    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ],
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() span: string = 'Gênero';
  @Input() opcoes: OpcaoModel[] = [];
  @Input() label: string = '';
  @Input() dropdownAberto: boolean = false;
  @Input() opcaoSelecionada: OpcaoModel = { label: '', valor: '' };
  @Output() opcaoSelecionadaEvent = new EventEmitter<OpcaoModel>();
  @Input() style: string = '';

  alterarDropdown() {
    this.dropdownAberto = !this.dropdownAberto;
  }

  selecionar(opcao: OpcaoModel) {
    this.opcaoSelecionada = opcao;
    this.dropdownAberto = false;
    this.opcaoSelecionadaEvent.emit(opcao);
    this.onChange(opcao.valor);
    this.onTouched();
  }

   private onChange = (valor: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    if (value) {
      const selecionada = this.opcoes.find(o => o.valor === value);
      if (selecionada) {
        this.opcaoSelecionada = selecionada;
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}