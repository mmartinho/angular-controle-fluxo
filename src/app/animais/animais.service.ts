import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TokenService } from './../autenticacao/token.service';
import { Animais } from './animais';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(private http : HttpClient, private tokenService: TokenService) { }

  /**
   * Retorna uma lista de animais em um Observable
   * @param nomeDoUsuario string
   * @returns Observable<Animais>
   */
  listaDoUsuario(nomeDoUsuario: string): Observable<Animais> {
    const token = this.tokenService.retornaToken();
    const headers = new HttpHeaders().append('x-access-token', token);
    return this.http.get<Animais>(`${API}/${nomeDoUsuario}/photos`, { headers: headers });
  }
}
