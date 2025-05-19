import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthServiceService } from '../../services/TokenService/auth-service.service';

@Injectable({
  providedIn: 'root'  // Isso garante que o AuthGuard seja registrado no injetor de dependência do Angular
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    // Verifica se o token existe
    const tokenIsValid = this.authService.tokenExists();

    if (!tokenIsValid) {
      // Se não houver token, redireciona para a página de login
      this.router.navigate(['/login']);
      return false;
    }

    // Se o token for válido, permite o acesso
    // this.router.navigate(['/clientes-cadastrados']);
    return true;
  }
}
