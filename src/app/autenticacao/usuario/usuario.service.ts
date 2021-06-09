import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

import { TokenService } from './../token.service';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioSubject = new BehaviorSubject<Usuario>({});

  /**
   * @param tokenService Injectable
   */
  constructor(private tokenService: TokenService) { 
    /** Verifica se já tem um token */
    if(this.tokenService.possuiToken()) {
      this.decodificaJWT();
    }
  }

  /**
   * Pega e decodifica o token, propagando-o para todos os 
   * subscribers o Usuário
   */
  private decodificaJWT() {
    const token = this.tokenService.retornaToken();
    const usuario = jwt_decode(token) as Usuario;
    this.usuarioSubject.next(usuario);
  }

  /**
   * Subscritor que retorna o usuário
   * @returns Observable
   */
  retornaUsuario() {
    return this.usuarioSubject.asObservable();
  }

  /**
   * Recebe um token, armazenando-o no localStorage 
   * e propaga para todos os que se subscreveram no 
   * Observable retornaUsuario() o objeto usuario
   * @param token 
   */
  salvaToken(token: string) {
    this.tokenService.salvaToken(token);
    this.decodificaJWT();
  }

  /**
   * Exclui o token, propagando para todos os que se
   * subscreveram no Observable retornaUsuario() um
   * objeto nulo
   */
  logout() {
    this.tokenService.excluiToken();
    this.usuarioSubject.next({});
  }

  /**
   * Verifica se já existe um token armazenado no 
   * localStorage
   * @returns boolean
   */
  estaLogado() {
    return this.tokenService.possuiToken();
  }
}
