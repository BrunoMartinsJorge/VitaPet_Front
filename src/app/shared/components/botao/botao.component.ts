import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botao',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button ngClass="{{ categoria }}" [disabled]="disabilitado" [style]="style">
      <i class="fa {{ icone }}" *ngIf="iconePosi == 'left' && icone != ''"></i>
      <span *ngIf="label != ''">{{ label }}</span>
      <i class="fa {{ icone }}" *ngIf="iconePosi == 'right' && icone != ''"></i>
    </button>
  `,
  styles: [
    `
      button {
        z-index: 1;
        position: relative;
      }

      button.primario {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75em;
        border: none;
        background-color: #0c6369;
        color: #fff;
        padding: 0.5em 1em;
        border-radius: 4px;
        font-size: 18px;
        cursor: pointer;
        overflow: hidden;
        transition: 0.4s;
      }

      button.secundario {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75em;
        background-color: transparent;
        color: #0c6369;
        border: 2px solid #0c6369;
        padding: 0.5em 1em;
        border-radius: 4px;
        font-size: 18px;
        cursor: pointer;
        overflow: hidden;
        transition: 0.4s;
      }

      button.perigo {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75em;
        border: none;
        background-color: #a50000;
        color: #fff;
        padding: 0.5em 1em;
        border-radius: 4px;
        font-size: 18px;
        cursor: pointer;
        overflow: hidden;
        transition: 0.4s;
      }

      button.perigo:hover {
        background-color: #7c0703;
      }

      button.secundario::before {
        content: '';
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
        background-color: #0c7f87;
        z-index: 1;
        transform: translateX(-100%);
        transition: 0.4s;
      }

      button.secundario:hover::before {
        transform: translateX(0);
      }

      button.secundario:hover span,
      button.secundario:hover i {
        color: #fff;
        z-index: 2;
        transition-delay: 0.2s;
      }

      button.primario:hover {
        background-color: #0c7f87;
      }

      button.primario:disabled {
        background-color: #606060;
        cursor: default;
        transition: 0.4s;
      }

      button.secundario:disabled {
        cursor: default;
        border-color: #606060;
        color: #606060;
        transition: 0.4s;
      }

      button.secundario:disabled::before {
        background-color: #606060;
      }

      button.primario:disabled:hover {
        background-color: #606060;
      }
    `,
  ],
})
export class BotaoComponent {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() style: string = '';
  @Input() categoria: 'primario' | 'secundario' | 'perigo' = 'primario';
  @Input() icone: string = '';
  @Input() iconePosi: 'left' | 'right' = 'left';
  @Input() disabilitado: boolean = false;

  ngOnInit(): void {}
}
