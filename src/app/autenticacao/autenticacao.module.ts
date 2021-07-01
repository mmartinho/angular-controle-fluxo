import { AutenticacaoInterceptor } from './autenticacao.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  /**
   * Registro interceptor da autenticação
   * o qual acrescenta a propriedade de cabeçalho 
   * (header) que contém o token de autenticação
   * @see gatitobook\src\app\autenticacao\autenticacao.interceptor.ts
   */
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacaoInterceptor,
      multi: true,
    },
  ],
})
export class AutenticacaoModule {}
