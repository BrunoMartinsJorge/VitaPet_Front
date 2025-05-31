import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { PetsModel } from '../../../models/Pets.model';
import { TipoAnimalENUM } from '../../../models/TipoAnimalENUM.model';
import { LetraFormatPipe } from '../../../pipes/letra-format.pipe';
import { ToastService } from '../../../services/ToastService/toast.service';
import { DropdownComponent } from '../../../shared/components/dropdown/dropdown.component';
import { LoadComponent } from '../../../shared/components/load/load.component';
import { PetsService } from '../../services/pets-service/pets.service';

@Component({
  selector: 'app-pets-cadastrados',
  standalone: true,
  imports: [CommonModule, LoadComponent, DropdownComponent, LetraFormatPipe],
  templateUrl: './pets-cadastrados.component.html',
  styleUrl: './pets-cadastrados.component.css',
})
export class PetsCadastradosComponent {
  busca: string = '';
  lista_pets: PetsModel[] = [];
  registrosPorPagina: number = 6;
  quantidadePaginas: number = 0;
  carregando_tabela: boolean = true;
  dropDownAberto: boolean = false;
  paginaAtual = 1;
  opcaoDeFiltro: string = '';

  opcoes_filtro_tipo_animal_selecionado: any = { label: '', valor: '' };
  opcoes_filtro_castrado_selecionado: any = { label: '', valor: '' };
  opcoes_filtro_tipo_animal: any[] = [
    {
      label: TipoAnimalENUM.Cachorro,
      valor: TipoAnimalENUM.Cachorro.toString(),
    },
    { label: TipoAnimalENUM.Gato, valor: TipoAnimalENUM.Gato.toString() },
    { label: TipoAnimalENUM.Hamster, valor: TipoAnimalENUM.Hamster.toString() },
    { label: TipoAnimalENUM.Passaro, valor: TipoAnimalENUM.Passaro.toString() },
    { label: TipoAnimalENUM.Peixe, valor: TipoAnimalENUM.Peixe.toString() },
    { label: TipoAnimalENUM.Outro, valor: TipoAnimalENUM.Outro.toString() },
    { label: 'Todos', valor: '' },
  ];

  constructor(
    private service: PetsService,
    private toast: ToastService,
    private cdr: ChangeDetectorRef
  ) {
    this.buscar_pets_cadastrados();
  }

  public filtrarPor(filtro: string): void {
    this.opcaoDeFiltro = filtro;
    this.dropDownAberto = false;
    this.cdr.detectChanges();
  }

  public alterarDropDown() {
    this.dropDownAberto = !this.dropDownAberto;
  }

  selecionarTipoAnimal(valor: any) {
    this.opcoes_filtro_tipo_animal_selecionado = valor;
    this.paginaAtual = 1;
  }

  selecionarCastrado(valor: any) {
    this.opcoes_filtro_castrado_selecionado = valor;
    this.paginaAtual = 1;
  }

  public buscar_pets_cadastrados() {
    this.service.buscarPetsCadastrados().subscribe({
      next: (response: PetsModel[]) => {
        this.lista_pets = response;
        this.calcularQtdPaginas(this.lista_pets.length);
      },
      error: (err) => {
        console.error(err);
        this.toast.addToast({
          tipo: 'error',
          mensagem: 'Erro ao buscar pets cadastrados!',
          duracao: 3000,
          icone: 'fa-circle-exclamation',
        });
      },
    });
    this.carregando_tabela = false;
  }

  calcularQtdPaginas(qtdValores: number) {
    this.quantidadePaginas =
      (qtdValores / this.registrosPorPagina) % 2 == 0
        ? Math.round(qtdValores / this.registrosPorPagina) + 1
        : Math.round(qtdValores / this.registrosPorPagina);
  }

  atualizarBusca(evento: any) {
    this.busca = evento.target.value;
  }

  public abrirDialogCadastroCliente() {}

  ordenarIdade(ordenarPor: 'maior' | 'menor') {
    if (ordenarPor === 'maior') {
      this.lista_pets.sort((a, b) => b.idade - a.idade);
    } else {
      this.lista_pets.sort((a, b) => a.idade - b.idade);
    }
  }

  get petsPaginados() {
    const inicio = (this.paginaAtual - 1) * this.registrosPorPagina;
    let petsFiltrados = this.lista_pets;

    if (this.busca) {
      petsFiltrados = petsFiltrados.filter((pet) =>
        pet.nome.toLowerCase().includes(this.busca.toLowerCase())
      );
    }

    if (this.opcaoDeFiltro) {
      petsFiltrados = petsFiltrados.filter(
        (pet) => pet.genero === this.opcaoDeFiltro
      );
    }

    if (this.opcoes_filtro_tipo_animal_selecionado.valor) {
      petsFiltrados = petsFiltrados.filter(
        (pet) =>
          pet.tipo_animal.toLocaleLowerCase() ===
          this.opcoes_filtro_tipo_animal_selecionado.valor.toLocaleLowerCase()
      );
    }

    if (this.opcoes_filtro_castrado_selecionado.valor) {
      petsFiltrados = petsFiltrados.filter(
        (pet) =>
          pet.castrado ===
          (this.opcoes_filtro_castrado_selecionado.valor.toLowerCase() ===
            'true')
      );
    }
    this.calcularQtdPaginas(
      petsFiltrados.length
    );
    return petsFiltrados.slice(inicio, inicio + this.registrosPorPagina);
  }

  proximaPagina() {
    if (this.paginaAtual < this.quantidadePaginas) this.paginaAtual++;
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) this.paginaAtual--;
  }
}
