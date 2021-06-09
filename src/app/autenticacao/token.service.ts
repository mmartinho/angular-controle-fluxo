import { Injectable } from '@angular/core';

const KEY='token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() { }

  /**
   * @returns string
   */
  retornaToken() {
    return localStorage.getItem(KEY) ?? '';
  }

  /**
   * @param token 
   */
  salvaToken(token: string): void {
    localStorage.setItem(KEY, token);
  }

  /**
   * 
   */
  excluiToken(): void {
    localStorage.removeItem(KEY);
  }

  /**
   * @returns boolean
   */
  possuiToken(): boolean{
    return !! this.retornaToken();
  }
}
