import { Component } from '@angular/core';
import { DialogComponent } from "../../shared/dialog/dialog.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DialogComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  clienteSelecionado: any = null;
  dialogVisivel: boolean = false;

    abrirDialog(cliente: any) {
    this.clienteSelecionado = cliente;
    this.dialogVisivel = true;
  }

  clientes: any[] = [
    { nome: 'Carlos Zaul', email: 'carlos@gmail.com', genero: 'Masculino', pets: 2, idade: 19 },
    { nome: 'Laura Ferreira', email: 'laura@gmail.com', genero: 'Feminino', pets: 5, idade: 27 },
    { nome: 'Beatris De Souza', email: 'beatris@gmail.com', genero: 'Feminino', pets: 6, idade: 22 },
    { nome: 'Guilherme Santos', email: 'gui@gmail.com', genero: 'Masculino', pets: 2, idade: 32 },
    { nome: 'Eduardo Pirez', email: 'eduardo@gmail.com', genero: 'Masculino', pets: 1, idade: 56 },
    { nome: 'Gustavo Cabral', email: 'gustavo@gmail.com', genero: 'Masculino', pets: 2, idade: 39 },
    { nome: 'Luana Da Silva', email: 'luana@gmail.com', genero: 'Feminino', pets: 2, idade: 67 },
    { nome: 'Mariana Lopes', email: 'mariana@gmail.com', genero: 'Feminino', pets: 3, idade: 24 },
    { nome: 'Rafael Souza', email: 'rafael@gmail.com', genero: 'Masculino', pets: 4, idade: 41 },
    { nome: 'Juliana Prado', email: 'juliana@gmail.com', genero: 'Feminino', pets: 1, idade: 36 },
    { nome: 'Fernando Lima', email: 'fernando@gmail.com', genero: 'Masculino', pets: 2, idade: 45 },
    { nome: 'Camila Torres', email: 'camila@gmail.com', genero: 'Feminino', pets: 5, idade: 33 },
    { nome: 'Tiago Martins', email: 'tiago@gmail.com', genero: 'Masculino', pets: 3, idade: 28 },
    { nome: 'Isabela Rocha', email: 'isabela@gmail.com', genero: 'Feminino', pets: 2, idade: 38 },
    { nome: 'Lucas Mendes', email: 'lucas@gmail.com', genero: 'Masculino', pets: 1, idade: 26 },
    { nome: 'Patrícia Oliveira', email: 'patricia@gmail.com', genero: 'Feminino', pets: 4, idade: 50 },
    { nome: 'André Almeida', email: 'andre@gmail.com', genero: 'Masculino', pets: 3, idade: 35 },
    { nome: 'Vanessa Ribeiro', email: 'vanessa@gmail.com', genero: 'Feminino', pets: 2, idade: 43 },
    { nome: 'Felipe Costa', email: 'felipe@gmail.com', genero: 'Masculino', pets: 2, idade: 21 },
    { nome: 'Letícia Moreira', email: 'leticia@gmail.com', genero: 'Feminino', pets: 1, idade: 30 },
    { nome: 'Bruno Nunes', email: 'bruno@gmail.com', genero: 'Masculino', pets: 5, idade: 40 },
    { nome: 'Aline Soares', email: 'aline@gmail.com', genero: 'Feminino', pets: 3, idade: 34 },
    { nome: 'Henrique Barros', email: 'henrique@gmail.com', genero: 'Masculino', pets: 1, idade: 52 },
    { nome: 'Renata Carvalho', email: 'renata@gmail.com', genero: 'Feminino', pets: 2, idade: 23 },
    { nome: 'Diego Ramos', email: 'diego@gmail.com', genero: 'Masculino', pets: 3, idade: 47 },
    { nome: 'Fabiana Lima', email: 'fabiana@gmail.com', genero: 'Feminino', pets: 6, idade: 29 },
    { nome: 'Marcelo Vieira', email: 'marcelo@gmail.com', genero: 'Masculino', pets: 2, idade: 48 },
    { nome: 'Sabrina Teles', email: 'sabrina@gmail.com', genero: 'Feminino', pets: 1, idade: 31 },
    { nome: 'Roberto Dias', email: 'roberto@gmail.com', genero: 'Masculino', pets: 4, idade: 53 },
    { nome: 'Daniela Cunha', email: 'daniela@gmail.com', genero: 'Feminino', pets: 2, idade: 37 },
    { nome: 'Murilo Batista', email: 'murilo@gmail.com', genero: 'Masculino', pets: 2, idade: 46 },
    { nome: 'Bruna Alves', email: 'bruna@gmail.com', genero: 'Feminino', pets: 3, idade: 44 },
    { nome: 'João Pedro', email: 'joao@gmail.com', genero: 'Masculino', pets: 2, idade: 25 },
    { nome: 'Tatiane Lopes', email: 'tatiane@gmail.com', genero: 'Feminino', pets: 1, idade: 28 },
    { nome: 'Vitor Hugo', email: 'vitor@gmail.com', genero: 'Masculino', pets: 3, idade: 42 },
    { nome: 'Paula Farias', email: 'paula@gmail.com', genero: 'Feminino', pets: 2, idade: 35 },
    { nome: 'Leonardo Borges', email: 'leonardo@gmail.com', genero: 'Masculino', pets: 1, idade: 20 },
    { nome: 'Natália Castro', email: 'natalia@gmail.com', genero: 'Feminino', pets: 5, idade: 39 },
    { nome: 'Alexandre Neves', email: 'alexandre@gmail.com', genero: 'Masculino', pets: 3, idade: 54 },
    { nome: 'Cristina Rezende', email: 'cristina@gmail.com', genero: 'Feminino', pets: 2, idade: 62 },
    { nome: 'Rogério Matos', email: 'rogerio@gmail.com', genero: 'Masculino', pets: 2, idade: 59 },
    { nome: 'Elaine Mendes', email: 'elaine@gmail.com', genero: 'Feminino', pets: 3, idade: 60 },
    { nome: 'Pedro Henrique', email: 'pedro@gmail.com', genero: 'Masculino', pets: 2, idade: 29 },
    { nome: 'Lívia Souza', email: 'livia@gmail.com', genero: 'Feminino', pets: 4, idade: 26 },
    { nome: 'Ricardo Paiva', email: 'ricardo@gmail.com', genero: 'Masculino', pets: 1, idade: 51 },
    { nome: 'Cíntia Braga', email: 'cintia@gmail.com', genero: 'Feminino', pets: 3, idade: 33 },
    { nome: 'Douglas Rocha', email: 'douglas@gmail.com', genero: 'Masculino', pets: 2, idade: 49 },
    { nome: 'Tainá Silva', email: 'taina@gmail.com', genero: 'Feminino', pets: 2, idade: 36 }
  ];
}
