export class FormLocalizacao {
    cep?: string;
    rua: string;
    bairro: string;
    numero: string;
    constructor(cep: string, rua: string, bairro: string, numero: string) {
        this.cep = cep;
        this.rua = rua;
        this.bairro = bairro;
        this.numero = numero;
    }
}