import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageConverterService {
  constructor(private http: HttpClient) {}

  public uploadImage(image: File, id: number) {
    if (!(image instanceof File)) {
      console.error('O parâmetro fornecido não é um arquivo válido:', image);
      return throwError(() => new Error('Arquivo inválido'));
    }

    const formData = new FormData();
    formData.append('image', image);

    return this.http.post(
      `http://localhost:8080/upload/${id}/imagem`,
      formData,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }
}
