import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { TokenService } from './../autenticacao/token.service';
import { Animais, Animal } from './animais';

const API = environment.apiURL;
const NOT_MODIFIED = '304';

@Injectable({
  providedIn: 'root',
})
export class AnimaisService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  /**
   * Retorna uma lista de animais em um Observable
   * @param nomeDoUsuario string
   * @returns Observable<Animais>
   */
  listaDoUsuario(nomeDoUsuario: string): Observable<Animais> {
    return this.http.get<Animais>(`${API}/${nomeDoUsuario}/photos`);
  }

  /**
   * Retorna as informações de um animal em um Observable
   * @param id number
   * @returns Observable<Animal>
   */
  buscaPorID(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${API}/photos/${id}`);
  }

  /**
   * Exclui o animal, retornando-o em um Observable
   * @param id 
   * @returns Observable<Animal>
   */
  excluiAnimal(id: number): Observable<Animal> {
    return this.http.delete<Animal>(`${API}/photos/${id}`);
  }

  /**
   * Curti o animal, retornando um Observable booleano
   * se foi ou não possível curtir
   * @param id 
   * @returns Observable<boolean>
   * @throws Error
   */
  curtir(id: number): Observable<boolean> {
    return this.http.post(`${API}/photos/${id}/like`,{},{observe:'response'}).pipe(
      mapTo(true), catchError((error)=>{
        return error.status === NOT_MODIFIED ? of(false) : throwError(error)
      })
    );
  }
}
