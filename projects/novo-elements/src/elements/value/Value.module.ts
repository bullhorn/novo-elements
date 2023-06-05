// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoCommonModule } from 'novo-elements/elements/common';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { EntityList } from './EntityList';
import { RenderPipe } from './Render';
import { NovoValueElement } from './Value';

@NgModule({
  imports: [CommonModule, NovoCommonModule, NovoIconModule],
  declarations: [NovoValueElement, RenderPipe, EntityList],
  exports: [NovoValueElement, RenderPipe, EntityList],
})
export class NovoValueModule {}
