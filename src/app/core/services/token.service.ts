import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { RotasService } from './rotas.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  /**
   * @description Decodifica o token
   * @param {string} token - O token a ser decodificado
   * @returns {any} - O token decodificado
   */
  public decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      console.error('Erro ao decodificar o token: ', Error);
      return null;
    }
  }

  /**
   * @description Pega o token do localStorage
   * @returns {string | null} - O token ou null
   */
  public get getToken(): string | null {
    return localStorage.getItem('token') || null;
  }

  /**
   * @description Define o token no localStorage
   * @param {string} value - O token a ser definido
   */
  public setToken(value: string): void {
    if (!value || !this.tokenIsValid(value)) return;
    localStorage.setItem('token', value);
    this.loadToken();
  }

  /**
   * @description Remove o token do localStorage
   */
  public removeToken(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  /**
   * @description Verifica se o token contém as regras necessárias para acessar a rota
   * @param {string[]} rules - As regras necessárias para acessar a rota
   * @returns {boolean} - Verdadeiro se o token contém as regras necessárias
   */
  public TokenHasRulesNecessaryToAccess(rules: string[]): boolean {
    if (this.getToken == null) return false;
    if (this.isTokenExpired(this.getToken)) return false;
    const token = this.decodeToken(this.getToken);
    const permissoes = token.rules;
    if (permissoes == null) return false;

    return rules.every(rule => permissoes.includes(rule));
  }

  /**
   * 
   * @description Verifica se o token contém as regras necessárias para acessar a rota
   * @param {string} token - O token a ser verificado
   * @returns {boolean} - Verdadeiro se o token contém as regras necessárias
   */
  private tokenIsValid(token: string): boolean {
    return !this.isTokenExpired(token);
  }

  /**
   * 
   * @description Verifica se o token expirou
   * @param {string} token - A token a ser verificada
   * @returns {boolean} - Verdadeiro se o token expirou
   */
  public isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    if (decodedToken && decodedToken.exp) {
      const expirationDate = new Date(decodedToken.exp * 1000);
      return expirationDate < new Date();
    }
    return true;
  }

  /**
   * 
   * @description Carrega o token e define as rotas permitidas para o usuário
   */
  public loadToken(): void {
    const token = this.getToken;
    if (!token || this.isTokenExpired(token)) {
      this.removeToken();
      return;
    }

    const rule = this.decodeToken(token).rules;
    const rotaPai = this.router.config.find(r => r.data?.['RULES']?.includes(rule));
    
    if (rotaPai) {
      const rotasFilhas = rotaPai.children || [];
      this.router.resetConfig([...this.router.config]);
      this.rotasService.setAllowedRoutes(rotasFilhas);      
      setTimeout(() => {
        const primeiraRota = rotasFilhas[0].path;
        this.router.navigate([`/${rotaPai.path}/${primeiraRota}`]);
      });
    } else {
      this.router.navigate(['/unauthorized']);
    }
  }


  constructor(private router: Router, private userService: UserService, private rotasService: RotasService) { }
}
