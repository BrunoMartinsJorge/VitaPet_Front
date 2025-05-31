import {
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ImagemStruct } from '../../../models/ImagemStruct.model';

@Component({
  selector: 'input-arquivo',
  standalone: true,
  imports: [CommonModule],
  styles: [
    `
      .container {
        height: 300px;
        width: 300px;
        border-radius: 10px;
        box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        gap: 5px;
        background-color: rgba(0, 110, 255, 0.041);
      }

      .header {
        max-width: 360px;
        flex: 1;
        width: 100%;
        border: 2px dashed royalblue;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }

      .header i {
        font-size: 42px;
        margin: 1em 0;
      }

      .header p {
        text-align: center;
        color: black;
      }

      footer {
        background-color: rgba(0, 110, 255, 0.075);
        width: 100%;
        height: 40px;
        padding: 8px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: black;
        border: none;
        gap: 1em;
      }

      footer i {
        color: royalblue;
        font-size: 1.2em;
        background-color: rgba(70, 66, 66, 0.103);
        border-radius: 50%;
        padding: 2px;
        cursor: pointer;
        box-shadow: 0 2px 30px rgba(0, 0, 0, 0.205);
      }

      footer label {
        flex: 1;
        text-align: center;
        cursor: pointer;
      }

      #file {
        display: none;
      }

      .img-selecionada {
        max-width: 360px;
        flex: 1;
        width: 100%;
        border: 2px dashed royalblue;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        overflow: hidden;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `,
  ],
  template: `
    <div class="container">
      <div class="header" *ngIf="!imagemSelecionada">
        <i class="fa-solid {{ icone }}"></i>
        <p>Escolha um arquivo para enviar!</p>
      </div>
      <div *ngIf="imagemSelecionada" class="img-selecionada">
        <figure>
          <img [src]="imagemSelecionada.src" [align]="" alt="" />
          <figcaption>{{ imagemSelecionada.file.name }}</figcaption>
        </figure>
      </div>
      <footer>
        <i class="fa fa-photo"></i>
        <label for="file">Clique aqui para selecionar um arquivo</label>
        <i class="fa-solid fa-trash-can" (click)="excluir_arquivo()"></i>
      </footer>
      <input
        id="file"
        type="file"
        (change)="processarArquivo($event)"
        [disabled]="disabilitado"
        (blur)="onTouched()"
        [accept]="tiposDeArquivos"
        #input_file
      />
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputArquivoComponent),
      multi: true,
    },
  ],
})
export class InputArquivoComponent implements ControlValueAccessor {
  @ViewChild('input_file') input_file!: ElementRef;
  @Input() tiposDeArquivos: string[] = ['image'];
  @Input() label: string = 'Adicionar arquivo';
  @Input() icone: string = 'fa-arrow-up-from-bracket';
  @Input() iconePos: 'left' | 'right' = 'left';
  @Input() disabilitado: boolean = false;

  imagemSelecionada: ImagemStruct | null = null;
  dragging = false;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragging = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragging = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (!this.arquivoValido(file)) return;

      this.imagemSelecionada = new ImagemStruct('', file);
      this.carregarArquivo(file);
      this.onChange(file);
    }
  }

  processarArquivo(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.arquivoValido(file)) return;

    this.carregarArquivo(file);
    this.onChange(file);
  }

  private carregarArquivo(file: File) {
    const reader = new FileReader();
    reader.addEventListener('load', (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result as string;
      this.imagemSelecionada = new ImagemStruct(result, file);
    });
    reader.readAsDataURL(file);
  }

  private arquivoValido(file: File): boolean {
    if (this.tiposDeArquivos.length === 0) return true;
    return this.tiposDeArquivos.some((tipo) => file.type.includes(tipo));
  }

  onChange = (value: File) => {};
  onTouched = () => {};

  writeValue(value: File | null): void {
    if (!value) {
      this.input_file?.nativeElement &&
        (this.input_file.nativeElement.value = '');
      this.imagemSelecionada = null;
    } else {
      this.carregarArquivo(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  excluir_arquivo() {
    this.imagemSelecionada = null;
  }
}
