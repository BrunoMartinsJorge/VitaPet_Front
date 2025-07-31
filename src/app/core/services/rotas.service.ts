import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RotasService {

  private rotasPermitidas: any[] = [];

  /**
   * @description Define as rotas permitidas para o usuário
   * @param {any[]} rotas - Rotas que o usuário pode acessar apartir de sua rule.
   */
  public setAllowedRoutes(rotas: any[]) {
    if (!rotas) return;
    this.rotasPermitidas = rotas;
  }

  /**
   * @description Pega as rotas permitidas e as retorna
   * @returns {any[]} - Rotas permitidas
   */
  public getAllowedRoutes(): any[] {
    if (!this.rotasPermitidas) return [];
    return this.rotasPermitidas;
  }

  constructor() { }
}
