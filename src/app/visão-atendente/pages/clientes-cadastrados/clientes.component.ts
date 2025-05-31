import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { FormularioInfoPessoaisComponent } from './formulario-info-pessoais/formulario-info-pessoais.component';
import { FormularioLocalizacaoComponent } from './formulario-localizacao/formulario-localizacao.component';
import { FormularioComplementaresComponent } from './formulario-complementares/formulario-complementares.component';
import { GeneroENUM } from '../../../models/EnumGenero.model';
import { FormatoTelefonePipe } from '../../../pipes/formato-telefone.pipe';
import { ImageConverterService } from '../../../services/servico-img/image-converter.service';
import { ToastService } from '../../../services/ToastService/toast.service';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { LoadComponent } from '../../../shared/components/load/load.component';
import { StepsComponent } from '../../../shared/components/steps/steps.component';
import { Cliente } from '../../models/Cliente.model';
import { FormularioCadastroClientes } from '../../models/formularios-cadastro-clientes.model';
import {
  somenteEspacosValidator,
  emailValidator,
  dataNascimentoValida,
  validarFormularioInfoPessoais,
} from '../../models/validar-formularios-cadastro.model';
import { ValidarCPF } from '../../models/ValidarCPF';
import { ClientesService } from '../../services/clientes-service/clientes.service';
import { PetsModel } from '../../../models/Pets.model';
import { LetraFormatPipe } from '../../../pipes/letra-format.pipe';
import { OptionStepModel } from '../../../models/OptionsStep';
import { FormularioEditarPetComponent } from './formulario-editar-pet/formulario-editar-pet.component';
import { BotaoComponent } from '../../../shared/components/botao/botao.component';
@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    StepsComponent,
    ReactiveFormsModule,
    BotaoComponent,
    FormularioInfoPessoaisComponent,
    FormularioLocalizacaoComponent,
    FormularioComplementaresComponent,
    LoadComponent,
    FormatoTelefonePipe,
    LetraFormatPipe,
    FormularioEditarPetComponent,
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent {
  busca: string = '';
  clientes: Cliente[] = [];
  carregando_tabela: boolean = true;

  atualizarBusca(evento: any) {
    this.busca = evento.target.value;
  }

  formularioCadastroCliente!: FormularioCadastroClientes;

  constructor(
    private toasts: ToastService,
    private service: ClientesService,
    private img_service: ImageConverterService
  ) {
    setTimeout(() => {
      this.buscarListaDeClientes();
    }, 2000);
  }

  calcularQtdPaginas(qtdValores: number) {
    this.quantidadePaginas =
      ((qtdValores / this.registrosPorPagina) % 2 == 0
        ? Math.round(qtdValores / this.registrosPorPagina) + 1
        : Math.round(qtdValores / this.registrosPorPagina)) + 1;
  }

  buscarListaDeClientes() {
    this.carregando_tabela = true;
    this.service.buscarListaClientesCadastrados().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        this.calcularQtdPaginas(clientes.length);
      },
      error: (err) => {
        console.error(err);
        this.toasts.addToast({
          tipo: 'error',
          mensagem: 'Erro ao buscar clientes cadastrados!',
          duracao: 3000,
          icone: 'fa-circle-exclamation',
        });
      },
    });
    this.carregando_tabela = false;
  }

  ngOnInit() {
    this.formularioCadastroCliente = this.criarFormulario();
  }

  criarFormulario() {
    return new FormularioCadastroClientes(
      new FormGroup(
        {
          nome: new FormControl('', [
            Validators.required,
            somenteEspacosValidator,
          ]),
          cpf: new FormControl('', [
            Validators.required,
            ValidarCPF.bind(this),
            somenteEspacosValidator,
          ]),
          telefone: new FormControl('', Validators.required),
          email: new FormControl('', [
            Validators.required,
            Validators.email,
            emailValidator,
          ]),
          dataNascimento: new FormControl('', [
            Validators.required,
            dataNascimentoValida,
          ]),
          genero: new FormControl('', Validators.required),
        },
        { validators: validarFormularioInfoPessoais }
      ),
      new FormGroup({
        cep: new FormControl(''),
        rua: new FormControl('', Validators.required),
        bairro: new FormControl('', Validators.required),
        numero: new FormControl('', Validators.required),
        complemento: new FormControl(''),
      }),

      new FormGroup({
        foto_pessoa: new FormControl(''),
      })
    );
  }

  criarFormularioEditarPet(): FormGroup {
    return new FormGroup({
      nome: new FormControl('', Validators.required),
      problemas_saude: new FormControl('', Validators.required),
      genero: new FormControl('', Validators.required),
      castrado: new FormControl('', Validators.required),
      raca_animal: new FormControl('', Validators.required),
    });
  }

  opcaoInfoClienteSelecionado: string = 'Informações';

  pets_cliente_selecionado: PetsModel[] = [];

  selecionarOpcao(event: any) {
    this.opcaoInfoClienteSelecionado = event;
    if (this.opcaoInfoClienteSelecionado == 'Pets')
      this.buscarListaPetsClienteSelecionado(this.idCliente);
  }

  buscarListaPetsClienteSelecionado(idCliente: number) {
    this.pets_cliente_selecionado = [];
    this.service.buscarPetsClienteSelecionado(idCliente).subscribe({
      next: (response) => {
        this.pets_cliente_selecionado = response;
      },
      error: (err) => {
        console.error(err);
        this.toasts.addToast({
          tipo: 'error',
          mensagem: 'Erro ao buscar pets desse cliente!',
          duracao: 3000,
          icone: 'fa-times-circle',
        });
      },
    });
  }

  steps: any[] = [
    {
      label: 'Informações Complementares',
      icon: 'fa-user',
      active: true,
    },
    {
      label: 'Localização',
      icon: 'fa-location-dot',
      active: false,
    },
    {
      label: 'Complementares',
      icon: 'fa-paw',
      active: false,
    },
  ];

  etapaFormulario: string = this.steps[0].label;
  dropDownAberto: boolean = false;
  opcaoDeFiltro: string = '';
  paginaAtual = 1;
  registrosPorPagina = 6;
  quantidadePaginas: number = 0;
  dialogCadastroVisivel: boolean = false;
  idCliente: number = 0;
  clienteSelecionado: Cliente | undefined = undefined;
  visibilidadeClienteSelecionado: boolean = false;

  avancarParaProximaEtapa(): void {
    let atual = this.steps.findIndex((step) => step.active);
    if (this.steps[this.steps.length - 1].active) return;
    this.steps[atual].active = false;
    this.steps[atual + 1].active = true;
    this.etapaFormulario = this.steps[atual + 1].label;
  }

  voltarParaEtapaAnterior(): void {
    let atual = this.steps.findIndex((step) => step.active);
    if (atual == 0) return;
    this.steps[atual].active = false;
    this.steps[atual - 1].active = true;
    this.etapaFormulario = this.steps[atual - 1].label;
  }

  alterarDropDown(): void {
    this.dropDownAberto = !this.dropDownAberto;
  }

  filtrarPor(opcao: string): void {
    this.opcaoDeFiltro = opcao;
    this.dropDownAberto = false;
  }

  get clientesPaginados() {
    const inicio = (this.paginaAtual - 1) * this.registrosPorPagina;
    let clientesFiltrados = this.clientes;
    if (this.opcaoDeFiltro != '') {
      this.paginaAtual = 1;
      clientesFiltrados = clientesFiltrados
        .filter((cliente) => cliente.genero === this.opcaoDeFiltro)
        .slice(inicio, inicio + this.registrosPorPagina);
    }
    if (this.busca != '') {
      this.paginaAtual = 1;
      clientesFiltrados = clientesFiltrados
        .filter(
          (cliente) =>
            cliente.nome_cliente
              .toLowerCase()
              .includes(this.busca.toLocaleLowerCase()) ||
            cliente.email.toLowerCase().includes(this.busca.toLocaleLowerCase())
        )
        .slice(inicio, inicio + this.registrosPorPagina);
      this.paginaAtual = 1;
    }
    this.calcularQtdPaginas(clientesFiltrados.length);
    return clientesFiltrados.slice(inicio, inicio + this.registrosPorPagina);
  }

  public excluirPet(idPet: number) {
    this.service.deletarPetCliente(idPet).subscribe({
      next: (response) => {
        console.log(response);
        this.toasts.addToast({
          tipo: 'success',
          mensagem: 'pet excluido com sucesso!',
          duracao: 3000,
          icone: 'fa-check-circle',
        });
        this.buscarListaPetsClienteSelecionado(this.idCliente);
      },
      error: (err) => {
        console.error(err);
        this.toasts.addToast({
          tipo: 'error',
          mensagem: 'Erro ao excluir pet!',
          duracao: 3000,
          icone: 'fa-times-circle',
        });
      },
    });
  }

  proximaPagina() {
    if (this.paginaAtual < this.quantidadePaginas) this.paginaAtual++;
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) this.paginaAtual--;
  }

  abrirDialogCadastroCliente(): void {
    this.dialogCadastroVisivel = true;
    this.formularioCadastroCliente.formularioComplementares.reset();
    this.formularioCadastroCliente.formularioInfoPessoais.reset();
    this.formularioCadastroCliente.formularioLocalizacao.reset();
  }

  ordenarIdade(ordenarPor: 'maior' | 'menor') {
    if (ordenarPor === 'maior') {
      this.clientes.sort((a, b) => b.idade - a.idade);
    } else {
      this.clientes.sort((a, b) => a.idade - b.idade);
    }
  }

  fecharDialog(): void {
    this.dialogCadastroVisivel = false;
  }

  abrirDialogInfoCliente(clienteSelecionado: Cliente) {
    this.clienteSelecionado = clienteSelecionado;
    this.visibilidadeClienteSelecionado = true;
    this.idCliente = clienteSelecionado.id;
  }

  opcoesStepInfoCliente: OptionStepModel[] = [
    {
      label: 'Informações',
      icon: 'fa-user',
      active: true,
    },
    {
      label: 'Pets',
      icon: 'fa-paw',
      active: false,
    },
  ];

  fecharDialogInfoCliente() {
    this.clienteSelecionado = undefined;
    this.visibilidadeClienteSelecionado = false;
    this.opcaoInfoClienteSelecionado = 'Informações';

    if (this.opcoesStepInfoCliente && this.opcoesStepInfoCliente.length >= 2) {
      this.opcoesStepInfoCliente[0].active = true;
      this.opcoesStepInfoCliente[this.opcoesStepInfoCliente.length - 1].active =
        false;
    }
  }

  visibilidadeDialogAlterarPetCliente: boolean = false;
  petClienteSelecionado: PetsModel | null = null;
  formularioEditarPet!: FormGroup;

  public abrirDialogEditarPetCliente(pet: PetsModel) {
    this.petClienteSelecionado = pet;
    this.visibilidadeDialogAlterarPetCliente = true;
    this.formularioEditarPet = this.criarFormularioEditarPet();
  }

  public fecharDialogEditarPetCliente() {
    this.petClienteSelecionado = null;
    this.visibilidadeDialogAlterarPetCliente = false;
    this.formularioEditarPet.reset();
  }

  cadastrarCliente(): void {
    if (
      this.formularioCadastroCliente.formularioComplementares.invalid ||
      this.formularioCadastroCliente.formularioLocalizacao.invalid ||
      this.formularioCadastroCliente.formularioInfoPessoais.invalid
    )
      return;
    let formularioCadastroClientes: any = {
      nome_cliente:
        this.formularioCadastroCliente.formularioInfoPessoais.get('nome')
          ?.value,
      cpf_cliente:
        this.formularioCadastroCliente.formularioInfoPessoais.get('cpf')?.value,
      telefone:
        this.formularioCadastroCliente.formularioInfoPessoais.get('telefone')
          ?.value,
      email:
        this.formularioCadastroCliente.formularioInfoPessoais.get('email')
          ?.value,
      data_nascimento:
        this.formularioCadastroCliente.formularioInfoPessoais.get(
          'dataNascimento'
        )?.value,
      genero_cliente: this.formularioCadastroCliente.formularioInfoPessoais.get(
        'genero'
      )?.value as GeneroENUM,

      cep: this.formularioCadastroCliente.formularioLocalizacao.get('cep')
        ?.value,
      bairro:
        this.formularioCadastroCliente.formularioLocalizacao.get('bairro')
          ?.value,
      rua: this.formularioCadastroCliente.formularioLocalizacao.get('rua')
        ?.value,
      numero:
        this.formularioCadastroCliente.formularioLocalizacao.get('numero')
          ?.value,
    };
    this.service.cadastrarNovoCliente(formularioCadastroClientes).subscribe({
      next: (res: any) => {
        this.toasts.addToast({
          tipo: 'success',
          mensagem: 'Cliente cadastrado com sucesso!',
          duracao: 3000,
          icone: 'fa-check-circle',
        });
        this.idCliente = res;
        this.img_service
          .uploadImage(
            this.formularioCadastroCliente.formularioComplementares.get(
              'foto_pessoa'
            )?.value,
            this.idCliente
          )
          .subscribe({
            next: () => {
              console.log('Imagem enviada com sucesso!');
            },
            error: (err) => {
              console.error('Erro ao enviar imagem:', err);
            },
          });
        this.dialogCadastroVisivel = false;
        location.reload();
      },
      error: (err) => {
        console.error(err);
        this.toasts.addToast({
          tipo: 'error',
          mensagem: 'Erro ao cadastrar cliente!',
          duracao: 3000,
          icone: 'fa-circle-exclamation',
        });
      },
    });
  }

  public deletarPet(id: number) {
    this.service.deletarCliente(id).subscribe({
      next: (response) => {
        this.toasts.addToast({
          tipo: 'success',
          mensagem: 'Cliente cadastrado com sucesso!',
          duracao: 3000,
          icone: 'fa-check-circle',
        });
        console.log(response);
      },
      error: (err) => {
        this.toasts.addToast({
          tipo: 'error',
          mensagem: 'Ocorreu um problema ao tentar excluir este cliente!',
          duracao: 3000,
          icone: 'fa-circle-exclamation',
        });
      },
    });
  }
}
