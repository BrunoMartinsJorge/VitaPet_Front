import { GeneroENUM } from "../../models/EnumGenero.model";

export class Cliente {
  id: number;
  nome_cliente: string;
  cpf_cliente: string;
  telefone: string;
  email: string;
  rua: string;
  bairro: string;
  numero: string;
  complemento: string;
  cep: string;
  genero: GeneroENUM;
  data_nascimento: string;
  idade: number;
  data_hora_cadastro: string;
  foto_pessoa: any;
  constructor(
    id: number,
    nome_cliente: string,
    cpf_cliente: string,
    telefone: string,
    email: string,
    rua: string,
    bairro: string,
    numero: string,
    complemento: string,
    cep: string,
    genero: GeneroENUM,
    data_nascimento: string,
    idade: number,
    data_hora_cadastro: string,
    foto_pessoa: any
  ) {
    this.id = id;
    this.nome_cliente = nome_cliente;
    this.cpf_cliente = cpf_cliente;
    this.telefone = telefone;
    this.email = email;
    this.rua = rua;
    this.bairro = bairro;
    this.numero = numero;
    this.complemento = complemento;
    this.cep = cep;
    this.genero = genero;
    this.data_nascimento = data_nascimento;
    this.idade = idade;
    this.data_hora_cadastro = data_hora_cadastro;
    this.foto_pessoa = foto_pessoa;
  }
}
