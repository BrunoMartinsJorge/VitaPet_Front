import { GeneroENUM } from "./EnumGenero.model";

export class FormInfoPessoais {
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    dataNascimento: string;
    genero: GeneroENUM;
    constructor(nome: string, cpf: string, telefone: string, email: string, dataNascimento: string, genero: GeneroENUM) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.genero = genero;
    }
}