import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormularioCadastroClientes } from '../../models/formularios-cadastro-clientes.model';
import { FormularioCadastroCompletoModel } from '../../models/formulario-cadastro-completo.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  public buscarListaClientesCadastrados(): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:8080');
  }

  public cadastrarNovoCliente(dados_cliente: FormularioCadastroCompletoModel): Observable<number>{
    return this.http.post<number>('http://localhost:8080', dados_cliente);
  }
}
