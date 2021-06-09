import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './cabecalho.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CabecalhoComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  /** Componente exportado para toda a app */
  exports: [CabecalhoComponent],
})
export class CabecalhoModule { }
