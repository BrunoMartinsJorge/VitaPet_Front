import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { StepsComponent } from '../../shared/steps/steps.component';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { BotaoComponent } from '../../shared/botao/botao.component';
import { FormularioInfoPessoaisComponent } from './formulario-info-pessoais/formulario-info-pessoais.component';
import { FormularioLocalizacaoComponent } from './formulario-localizacao/formulario-localizacao.component';
import { FormularioComplementaresComponent } from './formulario-complementares/formulario-complementares.component';
import { FormularioCadastroClientes } from '../../models/formularios-cadastro-clientes.model';
import { ToastService } from '../../services/ToastService/toast.service';
import { ClientesService } from '../../services/atendente-service/clientes.service';
import { GeneroENUM } from '../../models/EnumGenero.model';
import { ValidarCPF } from '../../models/ValidarCPF';
import {
  dataNascimentoValida,
  emailValidator,
  somenteEspacosValidator,
  validarFormularioInfoPessoais,
} from '../../models/validar-formularios-cadastro.model';
import { ImageConverterService } from '../../services/servico-img/image-converter.service';

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
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent {
  busca: string = '';
  clientes: any[] = [];

  atualizarBusca(evento: any) {
    this.busca = evento.target.value;
  }

  formularioCadastroCliente!: FormularioCadastroClientes;

  constructor(
    private toasts: ToastService,
    private service: ClientesService,
    private img_service: ImageConverterService
  ) {
    this.buscarListaDeClientes();
  }

  buscarListaDeClientes() {
    this.service.buscarListaClientesCadastrados().subscribe({
      next: (clientes) => (this.clientes = clientes),
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
        numero_complemento: new FormControl('', Validators.required),
      }),

      new FormGroup({
        foto_pessoa: new FormControl(''),
      })
    );
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
  registrosPorPagina = 9;
  quantidadePaginas: number =
    Math.ceil(this.clientes.length / this.registrosPorPagina) || 1;
  dialogCadastroVisivel: boolean = false;
  idCliente: number = 0;

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
    if (this.opcaoDeFiltro != '') {
      return this.clientes
        .filter((cliente) => cliente.genero === this.opcaoDeFiltro)
        .slice(inicio, inicio + this.registrosPorPagina);
    }
    if (this.busca != '') {
      return this.clientes
        .filter(
          (cliente) =>
            cliente.nome_cliente.toLowerCase().includes(this.busca) ||
            cliente.email.toLowerCase().includes(this.busca)
        )
        .slice(inicio, inicio + this.registrosPorPagina);
    }
    return this.clientes.slice(inicio, inicio + this.registrosPorPagina);
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

  fecharDialog(): void {
    this.dialogCadastroVisivel = false;
  }

  opSelec: any = { label: 'Masculino', valor: 'masculino' };

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
      numero_complemento:
        this.formularioCadastroCliente.formularioLocalizacao.get(
          'numero_complemento'
        )?.value,
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
        this.buscarListaDeClientes();
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
}
