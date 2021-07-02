import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../../environments/environment';
import { Comentarios, Comentario } from './comentarios';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  constructor(private http: HttpClient) {}

  /**
   * Retorna o array de comentarios em um Observable
   * OBS: esse observable é subscrito pela função pipe-sync no template
   * @param id 
   * @returns 
   */
  buscaComentario(id: number): Observable<Comentarios> {
    return this.http.get<Comentarios>(`${API}/photos/${id}/comments`);
  }

  /**
   * Retorna uma interface com os dados do comentário em um Observable
   * OBS: esse observable é subscrito pela função pipe-sysnc no template
   * @param id 
   * @param commentText 
   * @returns 
   */
  incluiComentario(id: number, commentText: string): Observable<Comentario> {
    return this.http.post<Comentario>(`${API}/photos/${id}/comments`, {commentText: commentText});
  }
}
