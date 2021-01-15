// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoCommonModule } from '../common/common.module';
import { EntityList } from './EntityList';
import { RenderPipe } from './Render';
import { NovoValueElement } from './Value';

@NgModule({
  imports: [CommonModule, NovoCommonModule],
  declarations: [NovoValueElement, RenderPipe, EntityList],
  exports: [NovoValueElement, RenderPipe, EntityList],
})
export class NovoValueModule {}
