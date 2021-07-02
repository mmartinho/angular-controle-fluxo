import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

import { ComentariosService } from './comentarios.service';
import { Comentarios } from './comentarios';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css'],
})
export class ComentariosComponent implements OnInit {
  @Input() id!: number;
  comentarios$!: Observable<Comentarios>;
  comentarioForm!: FormGroup;

  constructor(
    private comentarioService: ComentariosService,
    private formBuilder: FormBuilder
  ) {}

  /** */
  ngOnInit(): void {
    /** 
     * id "inputado" de outro componente 
     * usado para buscar o comentario
     * @see gatitobook\src\app\animais\detalhe-animal\detalhe-animal.component.html 
     */
    this.comentarios$ = this.comentarioService.buscaComentario(this.id);
    /** Formulario e validações */
    this.comentarioForm = this.formBuilder.group({
      comentario: ['',Validators.maxLength(300)]
    });
  }

  /**
   * Salva o comentário na API
   */
  gravar():void {
    const comentario = this.comentarioForm.get('comentario')?.value ?? '';
    this.comentarios$ = this.comentarioService.incluiComentario(this.id, comentario).pipe(
      switchMap(()=>{
        return this.comentarioService.buscaComentario(this.id);
      }),
      tap(()=>{
        this.comentarioForm.reset();
        alert('Comentário salvo');
      })
    );
  }
}
