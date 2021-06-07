import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioExisteService } from './usuario-existe.service';
import { minusculoValidator } from './minusculo.validator';
import { NovoUsuario } from './novo-usuario';
import { NovoUsuarioService } from './novo-usuario.service';
import { usuarioSenhaIguaisValidator } from './usuario-senha-iguais.validator';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css'],
})
export class NovoUsuarioComponent implements OnInit {
  novoUsuarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private novoUsuarioService: NovoUsuarioService,
    private usuarioExistenteService: UsuarioExisteService,
    private router: Router
  ) {}

  /**
   * Inicialização do componente criando o
   * formulário reativo e as validações dos campos
   */
  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group(
      /** 
       * Por campo 
       */
      {
        /** Validações padrão */
        email: ['', [Validators.required, Validators.email]],
        /** Validações padrão */
        fullName: ['', [Validators.required, Validators.minLength(4)]],
        userName: [
          '',
          /** Validação customizada síncrona */
          [minusculoValidator],
          /** Validação customizada assíncrona usando Observable */
          [this.usuarioExistenteService.usuarioJaExiste()],
        ],
        password: [''],
      },
      /** 
       * Formulário inteiro 
       */
      {
        /** Validação síncrona customizada */
        validators: [usuarioSenhaIguaisValidator],
      }
    );
  }

  /**
   * Cadastra o novo usuário usando os dados
   * do formulário reativo
   */
  cadastrar() {
    if(this.novoUsuarioForm.valid) {
      const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
      this.novoUsuarioService.cadastraNovoUsuario(novoUsuario).subscribe(
        () => {
          this.router.navigate(['']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
