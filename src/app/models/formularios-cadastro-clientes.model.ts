import { Form, FormGroup } from "@angular/forms";
import { FormInfoPessoais } from "./formulario-info-pessoais.model";
import { FormLocalizacao } from "./formulario-localizacao.model";

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


