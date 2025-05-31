import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LetraFormatPipe } from '../../../pipes/letra-format.pipe';

export interface OpcaoModel {
  label: string;
  valor: string;
  icone?: string;
  disabilitado?: boolean;
}

@Component({
  selector: 'dropdown-personalizado',
  standalone: true,
  imports: [CommonModule, LetraFormatPipe],
  template: `
    <div class="dropdown" [ngClass]="{ 'dropdown-aberto': dropdownAberto }">
      <span *ngIf="span != ''">{{ span }}</span>
      <button
        class="dropdown-button"
        (click)="alterarDropdown()"
        type="button"
        [style]="style"
      >
        <span *ngIf="opcaoSelecionada?.label; else defaultLabel">
          {{ opcaoSelecionada.label | letraFormat }}
        </span>
        <ng-template #defaultLabel>
          {{ label }}
        </ng-template>

        <i class="fa-solid fa-chevron-down"></i>
      </button>
      <div class="dropdown-content">
        <a (click)="selecionar(opcao)" *ngFor="let opcao of opcoes">{{
          opcao.label
        }}</a>
      </div>
    </div>
  `,
  styles: [
    `
      span {
        font-size: 0.9rem;
        color: #606060;
      }

      .dropdown {
        position: relative;
        z-index: 999 !important;
      }

      .dropdown-button {
        min-width: 200px;
        width: 100%;
        background: transparent;
        color: #606060;
        border: 1px solid #606060;
        border-radius: 10px;
        padding: 5px 10px;
        cursor: pointer;
        gap: 0.5em;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
        z-index: 999;
      }

      .dropdown-content {
        cursor: pointer;
        display: none;
        position: absolute;
        background-color: white;
        min-width: 160px;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
        z-index: 999 !important;
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
        z-index: 999;
      }

      .dropdown-content a:hover {
        background-color: #f1f1f1;
        cursor: pointer;
      }

      .dropdown.dropdown-aberto .dropdown-content {
        display: block;
        position: absolute;
        z-index: 999 !important;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() span: string = '';
  @Input() opcoes: OpcaoModel[] | any[] | string[] = [];
  @Input() label: string = '';
  @Input() dropdownAberto: boolean = false;
  @Input() opcaoSelecionada: OpcaoModel = { label: '', valor: '' };
  @Output() opcaoSelecionadaEvent = new EventEmitter<OpcaoModel>();
  @Input() style: string = '';

  alterarDropdown() {
    this.dropdownAberto = !this.dropdownAberto;
    console.log(this.opcaoSelecionada);
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
      const selecionada = this.opcoes.find((o) => o.valor === value);
      if (selecionada) {
        this.opcaoSelecionada = selecionada;
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.dropdownAberto = false;
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
