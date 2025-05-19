import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'input-personalizado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  template: `
    <div class="input-group" [ngClass]="erroCampo ? 'erro-input' : ''">
      <ng-container *ngIf="label">
        <label [for]="label">{{ label }}</label>
      </ng-container>

      <div class="input-container">
        <i class="fa {{ icone }}" *ngIf="icone && iconPosition === 'left'"></i>

        <input
          [style]="style"
          #input
          [type]="type"
          [placeholder]="placeholder"
          [id]="label"
          [value]="value"
          (input)="onInputChange($event)"
          (blur)="onTouched()"
          [disabled]="disabilitado"
          [mask]="mask"
          [min]="min"
          [max]="max"
        />

        <i
          class="fa {{ icone }}"
          *ngIf="
            icone && iconPosition === 'right' && type !== 'password';
            else tipoSenha
          "
        ></i>

        <ng-template #tipoSenha>
          <i
            id="icon-selecionavel"
            class="fa {{ icone }}"
            (click)="alterarVisibilidadeSenha()"
          ></i>
        </ng-template>
      </div>
    </div>
  `,
  styles: [
    `
      .input-group.erro-input .input-container {
        color: rgb(146, 47, 47);
        border-color: rgb(146, 47, 47);
      }

      .input-group.erro-input label {
        color: rgb(146, 47, 47);
      }

      .input-group.erro-input .input-container input::placeholder {
        color: rgb(146, 47, 47);
      }

      .input-group {
        display: flex;
        flex-direction: column;
        gap: 0.15em;
      }

      .input-group label {
        font-size: 0.9rem;
        color: #606060;
      }

      .input-group .input-container {
        display: flex;
        align-items: center;
        border-radius: 5px;
        border: none;
        border: 1px solid #606060;
        outline: none;
        color: #606060;
        width: 100%;
        transition: 0.4s;
      }

      .input-group .input-container i {
        padding: 0 0.25em 0 0.25em;
      }

      .input-group .input-container i#icon-selecionavel:hover {
        cursor: pointer;
      }

      .input-group .input-container input {
        width: 100%;
        height: 100%;
        padding: 0.5em 0.5em;
        border: none;
        background-color: transparent;
        outline: none;
        color: #606060;
        overflow: hidden;
      }

      .input-group .input-container:focus-within {
        outline: auto;
        outline-color: #0c63699f;
      }
      .input-group .input-container:focus-within input::placeholder {
        color: #0c63699f;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @ViewChild('input') input!: ElementRef;
  @Input() placeholder: string = '...';
  @Input() type: string = 'text';
  @Input() label: string = 'Teste';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() icone: string = '';
  @Input() value: string = '';
  @Input() style: string = '';
  @Input() disabilitado: boolean = false;
  @Input() mask: string = '';
  @Input() erroCampo: boolean = false;

  @Input() min: number = 0;
  @Input() max: number = 1000;

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  alterarVisibilidadeSenha(): void {
    let input = document.getElementById(this.label) as HTMLInputElement;
    if (input.type === 'password') {
      this.icone = 'fa-eye';
      input.type = 'text';
    } else {
      this.icone = 'fa-eye-slash';
      input.type = 'password';
    }
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  setInputValue(value: string) {
    if (this.input) {
      this.input.nativeElement.value = value;
    }
  }
}
