import { GeneroENUM } from '../../models/EnumGenero.model';
import { TipoAnimalENUM } from '../../models/TipoAnimalENUM.model';

export class FormularioEdicaoPet {
  nome: string;
  problemas_saude: string;
  genero: GeneroENUM;
  castrado: boolean;
  tipo_animal: TipoAnimalENUM;
  raca_animal: string;
  constructor(nome: string, problemas_saude: string, genero: GeneroENUM, castrado: boolean, tipo_animal: TipoAnimalENUM, raca_animal: string){
    this.nome = nome;
    this.problemas_saude = problemas_saude;
    this.genero = genero;
    this.castrado = castrado;
    this.tipo_animal = tipo_animal;
    this.raca_animal = raca_animal;
  }
}
