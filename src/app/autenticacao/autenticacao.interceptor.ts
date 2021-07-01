import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from './token.service';

/**
 * @see gatitobook\src\app\autenticacao\autenticacao.module.ts
 * ...para saber como este interceptador foi registrado
 */
@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  /**
   * @param request 
   * @param next 
   * @returns 
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if(this.tokenService.possuiToken()) {
      const token = this.tokenService.retornaToken();
      const headers = new HttpHeaders().append('x-access-token', token);
      /** Acrescenta o novo header do token */
      request = request.clone({headers: headers});      
    }
    return next.handle(request);
  }
}
