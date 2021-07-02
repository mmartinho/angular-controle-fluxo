import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Animais, Animal } from './../animais';
import { AnimaisService } from './../animais.service';
import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css'],
})
export class ListaAnimaisComponent implements OnInit {
  /*animais!: Animais;*/
  
  animais!: Animais;
   
  /** 
   * Passamos a usar "resolver", não é mais um Observable
   * animais$!: Observable<Animais>;
   */

  constructor(
    /* Não usa mais Observable, então, não precisamos mais desses serviços
    private usuarioService: UsuarioService,
    private animaisService: AnimaisService*/
    private activatedRoute: ActivatedRoute
  ) {}

  /**
   * Subscribe dentro de um Subscribe não é uma boa prática
   */
  /*ngOnInit(): void {
    this.usuarioService.retornaUsuario().subscribe(
      (usuario) => {
        const userName = usuario.name ?? '';
        if(userName) {
          console.log('Pegando a lista de animais de '+userName);
          this.animaisService.listaDoUsuario(userName).subscribe(
            (animais) => {
              console.log(userName+' possui '+animais.length+' animal(is)');
              this.animais = animais;
            },
            (error) => {
              console.log(error);
            }
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }*/

  /**
   * O template passa a fazer o subscribe, então, só temos
   * que alterar o fluxo com o pipe/switchMap retornando 
   * um outro observable. Note que propriedade animais 
   * passou a ser um tipo "Observable<Animais>"
   */
 /*ngOnInit(): void {
    this.animais$ = this.usuarioService.retornaUsuario().pipe(
      switchMap((usuario) => {
          const userName = usuario.name ?? '';
          if(userName) {
            return this.animaisService.listaDoUsuario(userName)
          } else {
            return new Observable<Animais>();
          }
      })
    );
  }*/

  ngOnInit(): void {
    /** 
     * Os dados de animais são retornados ao objeto snapshot da rota ativa
     * via Resolver 
     * @see gatitobook\src\app\animais\lista-animais\lista-animais.resolver.ts
     */    
    this.activatedRoute.params.subscribe((params)=> {
      this.animais = this.activatedRoute.snapshot.data['animais'];
    })
  }

}
