import { environment } from './../../../environments/environment';
import { NovoUsuario } from './novo-usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = environment.apiURL;

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
    return this.httpClient.post(`${API}/user/signup`, novoUsuario);
  }

  /**
   * Observable que verifica se usuário existe
   * @param nomeUsuario 
   * @returns 
   */
  verificaUsuarioExistente(nomeUsuario: string) {
    return this.httpClient.get(`${API}/user/exists/${nomeUsuario}`);
  }
}
