import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { NovoUsuarioService } from './novo-usuario.service';
import { first, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuarioExisteService {
  constructor(private novoUsuarioService: NovoUsuarioService) {}

  /**
   * Verifica se usuário já Existe
   * @returns Observable<Object | null>
   */
  usuarioJaExiste() {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        switchMap( (nomeUsuario) => 
          this.novoUsuarioService.verificaUsuarioExistente(nomeUsuario ? nomeUsuario : 'nenhum') 
        ),
        map( (usuarioExiste) => 
          usuarioExiste ? { usuarioExiste: true } : null 
        ),
        first()
      );
    };
  }
}
