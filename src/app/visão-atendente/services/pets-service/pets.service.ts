import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PetsModel } from '../../../models/Pets.model';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  constructor(private http: HttpClient) {}

  public buscarPetsCadastrados(): Observable<PetsModel[]> {
    return this.http.get<PetsModel[]>(`/pets_clinica/listar-todos-pets`);
  }
}
