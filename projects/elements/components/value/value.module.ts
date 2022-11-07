// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoValueElement } from './value';
import { RenderPipe } from './render';
import { EntityList } from './entity-list';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoCommonModule } from 'novo-elements/common';

@NgModule({
  imports: [CommonModule, NovoCommonModule, NovoIconModule],
  declarations: [NovoValueElement, RenderPipe, EntityList],
  exports: [NovoValueElement, RenderPipe, EntityList],
})
export class NovoValueModule {}
