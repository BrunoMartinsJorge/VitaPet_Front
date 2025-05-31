import { GeneroENUM } from "../../models/EnumGenero.model";

export class FormularioCadastroCompletoModel {
  public nome_cliente: string;
  public cpf_cliente: string;
  public telefone: string;
  public email: string;
  public dataNascimento: string;
  public genero: GeneroENUM;
  public cep: string;
  public bairro: string;
  public rua: string;
  public numero_casa: number;
  public foto_pessoa: any;

  constructor(
    nome_cliente: string,
    cpf_cliente: string,
    telefone: string,
    email: string,
    dataNascimento: string,
    genero: GeneroENUM,
    cep: string,
    bairro: string,
    rua: string,
    numero_casa: number,
    foto_pessoa: any
  ) {
    this.nome_cliente = nome_cliente;
    this.cpf_cliente = cpf_cliente;
    this.telefone = telefone;
    this.email = email;
    this.dataNascimento = dataNascimento;
    this.genero = genero;
    this.cep = cep;
    this.bairro = bairro;
    this.rua = rua;
    this.numero_casa = numero_casa;
    this.foto_pessoa = foto_pessoa;
  }
}
