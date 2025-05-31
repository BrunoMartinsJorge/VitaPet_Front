import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dialog-personalizado',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main *ngIf="visibilidade">
      <section class="section-dialog" [style]="style">
        <header class="header-dialog">
          <div class="titulo-subtitulo">
            <h1>
              {{ headerDoDialog }}
            </h1>
            <span>{{ subtituloDoDialog }}</span>
          </div>
          <i
            class="fa fa-close"
            (click)="fecharDialog()"
            *ngIf="iconVisibilidade"
          ></i>
        </header>
        <div class="body-dialog">
          <ng-content> </ng-content>
        </div>
      </section>
    </main>
  `,
  styles: [
    `
      main {
        inset: 0 0 0 0;
        position: absolute;
        width: 100%;
        height: 100vh;
        display: flex;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #0000006b;
      }

      main .section-dialog {
        position: absolute;
        background-color: #fff;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        min-height: 300px;
        max-height: 80vh;
        transition: 0.4s;
      }

      .header-dialog {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #0c6369;
        padding: 1em;
        color: #fff;
      }

      .header-dialog .titulo-subtitulo {
        display: flex;
        flex-direction: column;
        gap: 0.35em;
      }

      .header-dialog .titulo-subtitulo h1 {
        font-size: 1.6em;
        font-weight: 500;
      }

      .header-dialog .titulo-subtitulo span {
        font-size: 14px;
        color: #cdcdcd;
      }

      .header-dialog i {
        color: #fff;
        border: 1px solid #fff;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: 0.4s;
      }

      .header-dialog i:hover {
        background-color: #fff;
        color: #0c6369;
      }

      .body-dialog {
        margin: 0;
        padding: 1em;
        overflow-y: auto;
      }
    `,
  ],
})
export class DialogComponent {
  @Input() style: string = 'width: 30%;';
  @Input() iconVisibilidade: boolean = true;
  @Input() exibirFooter: boolean = true;
  @Input() visibilidade: boolean = false;
  @Input() headerDoDialog: string = '';
  @Input() subtituloDoDialog: string = '';
  @Output() fecharDialogEvent = new EventEmitter<void>();

  fecharDialog(): void {
    this.visibilidade = false;
    this.fecharDialogEvent.emit();
  }
}
