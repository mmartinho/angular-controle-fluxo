import { NovoUsuario } from './novo-usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Observable para criar o novo usuário usando a API backend
   * @param novoUsuario 
   * @returns Observable<NovoUsuario>
   */
  cadastraNovoUsuario(novoUsuario: NovoUsuario) {
    return this.httpClient.post('http://localhost:3000/user/signup', novoUsuario);
  }
}
