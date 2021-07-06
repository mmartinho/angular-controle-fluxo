import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuModule } from './../menu/menu.module';
import { CabecalhoComponent } from './cabecalho.component';

@NgModule({
  declarations: [CabecalhoComponent],
  imports: [CommonModule, RouterModule, MenuModule],
  /** Componente exportado para toda a app */
  exports: [CabecalhoComponent],
})
export class CabecalhoModule {}
