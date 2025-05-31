import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn, // Importe HttpHandlerFn
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenServiceService } from './token-service/token-service.service';

export const baseUrl = 'http://localhost:8080';

const tokenService = new TokenServiceService();

export const InterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  let newReq = req;

  if (!req.url.startsWith('http')) {
    newReq = req.clone({ url: `${baseUrl}${req.url}` });
  }

  const authToken = tokenService.getToken();
  if (authToken) {
    newReq = newReq.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  return next(newReq).pipe(tap((event: HttpEvent<any>) => {}));
};
