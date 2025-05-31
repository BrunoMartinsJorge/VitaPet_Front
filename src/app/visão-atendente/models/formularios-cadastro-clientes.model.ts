import { FormGroup } from "@angular/forms";

export class FormularioCadastroClientes {
    formularioInfoPessoais: FormGroup;
    formularioLocalizacao: FormGroup;
    formularioComplementares: FormGroup;
    constructor(formularioInfoPessoais: FormGroup, formularioLocalizacao: FormGroup, formularioComplementares: FormGroup) {
        this.formularioInfoPessoais = formularioInfoPessoais;
        this.formularioLocalizacao = formularioLocalizacao;
        this.formularioComplementares = formularioComplementares;
    }
}


