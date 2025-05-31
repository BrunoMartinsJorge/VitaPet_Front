// interceptor.ts (Alternativa)
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler, // Importe HttpHandler para a classe
  HttpEvent,
  HttpResponse,
  HttpInterceptorFn,
  HttpHandlerFn, // Importe HttpHandlerFn para a função de fábrica
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Interceptor implements HttpInterceptor {
  private readonly baseUrl = 'http://localhost:8080';

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler // Aqui é HttpHandler, que tem o método handle
  ): Observable<HttpEvent<any>> {
    let newReq = req;

    if (!req.url.startsWith('http')) {
      newReq = req.clone({ url: `${this.baseUrl}/${req.url}` });
    }

    const authToken = localStorage.getItem('token');
    if (authToken) {
      newReq = newReq.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    return next.handle(newReq).pipe(
      // Aqui continua sendo next.handle(newReq) para a classe
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('Response arrived:', event.status);
        }
      })
    );
  }
}

// Crie uma função que retorna uma instância do seu interceptor de classe
export const InterceptorProviderFn: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn // Aqui é HttpHandlerFn, que é uma função
): Observable<HttpEvent<any>> => {
  const interceptor = inject(Interceptor); // Injeta a instância da classe
  // AQUI É A MUDANÇA: Você precisa passar a função 'next' para o método 'intercept' da sua classe
  // O método 'intercept' da sua classe espera um HttpHandler, não um HttpHandlerFn.
  // Você pode criar um HttpHandler a partir do HttpHandlerFn, mas é um pouco mais complexo.
  // A maneira mais direta é reescrever a lógica da classe diretamente na função de fábrica.

  // Revertendo para a lógica da classe dentro da função de fábrica (mais simples)
  let newReq = req;
  const baseUrl = 'http://localhost:8080'; // Ou injete o serviço de config se tiver um

  if (!req.url.startsWith('http')) {
    newReq = req.clone({ url: `${baseUrl}/${req.url}` });
  }

  const authToken = 'seu_token_aqui';
  if (authToken) {
    newReq = newReq.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  return next(newReq).pipe(
    // <-- MUDANÇA AQUI: de next.handle(newReq) para next(newReq)
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        console.log('Response arrived:', event.status);
      }
    })
  );
};
