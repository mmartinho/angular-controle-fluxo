import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemComponent } from './mensagem.component';

@NgModule({
  declarations: [MensagemComponent],
  imports: [CommonModule],
  /** Componente exportado para toda a app */
  exports: [MensagemComponent],
})
export class MensagemModule {}
