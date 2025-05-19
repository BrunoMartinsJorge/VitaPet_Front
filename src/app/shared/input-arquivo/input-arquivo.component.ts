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
import { ImagemStruct } from '../../models/ImagemStruct.model';

@Component({
  selector: 'app-input-arquivo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="input-archive" [ngClass]="disabilitado ? 'desabilitado' : ''">
      <label for="image-input">
        <i class="fa {{ icone }}" *ngIf="iconePos === 'left'"></i>
        {{ label }}
        <i class="fa {{ icone }}" *ngIf="iconePos === 'right'"></i>
      </label>
      <input
        type="file"
        (change)="processarArquivo($event)"
        id="image-input"
        [disabled]="disabilitado"
        (blur)="onTouched()"
        #input_file
      />
      <span class="nome-arquivo" [ngClass]="imagemSelecionada ? 'existe' : ''">
        {{
          imagemSelecionada
            ? 'Arquivo selecionado: ' + imagemSelecionada.file.name
            : ''
        }}
      </span>
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
}
