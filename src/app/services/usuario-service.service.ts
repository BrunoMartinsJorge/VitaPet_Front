import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuarioServiceService {
  private readonly URL = '/usuario';

  constructor(private http: HttpClient) {}

  public logarUsuario(dadosForm: any){
    return this.http.get<any>(`${this.URL}/login`,dadosForm);
  }
}
