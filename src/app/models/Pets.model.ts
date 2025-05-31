import { Subscriber } from 'rxjs';
import { GeneroENUM } from './EnumGenero.model';
import { TipoAnimalENUM } from './TipoAnimalENUM.model';

export class PetsModel {
  id: number;
  nome: string;
  idade: number;
  data_cadastro: string;
  id_dono: number;
  problemas_saude: string;
  genero: GeneroENUM;
  castrado: boolean;
  tipo_animal: TipoAnimalENUM;
  raca_animal: string;

  constructor(
    id: number,
    nome: string,
    idade: number,
    dataCadastro: string,
    idDono: number,
    problemas_saude: string,
    genero: GeneroENUM,
    castrado: boolean,
    tipo_animal: TipoAnimalENUM,
    raca_animal: string
  ) {
    this.id = id;
    this.nome = nome;
    this.castrado = castrado;
    this.data_cadastro = dataCadastro;
    this.idade = idade;
    this.id_dono = idDono;
    this.problemas_saude = problemas_saude;
    this.genero = genero;
    this.tipo_animal = tipo_animal;
    this.raca_animal = raca_animal;
  }
}
