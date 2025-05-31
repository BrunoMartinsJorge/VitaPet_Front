import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormularioCadastroCompletoModel } from '../../models/formulario-cadastro-completo.model';
import { Cliente } from '../../models/Cliente.model';
import { PetsModel } from '../../../models/Pets.model';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor(private http: HttpClient) {}

  public buscarListaClientesCadastrados(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(``);
  }

  public cadastrarNovoCliente(
    dados_cliente: FormularioCadastroCompletoModel
  ): Observable<number> {
    return this.http.post<number>(``, dados_cliente);
  }

  public buscarPetsClienteSelecionado(
    idCliente: number
  ): Observable<PetsModel[]> {
    return this.http.get<PetsModel[]>(
      `/buscar-pets-cliente/${idCliente}`
    );
  }

  public deletarPetCliente(idPet: number): Observable<any>{
    return this.http.delete(`/excluir-pet/${idPet}`);
  }

  public deletarCliente(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`/deletar-cliente/${id}`);
  }
}
