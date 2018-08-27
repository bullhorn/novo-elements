// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoValueElement, NOVO_VALUE_THEME, NOVO_VALUE_TYPE } from './Value';
import { RenderPipe } from './Render';
import { EntityList } from './EntityList';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoValueElement, RenderPipe, EntityList],
  exports: [NovoValueElement, RenderPipe, EntityList],
})
export class NovoValueModule {}
