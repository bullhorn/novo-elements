// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoCommonModule } from '../common/common.module';
import { NovoIconModule } from '../icon/Icon.module';
import { EntityList } from './EntityList';
import { RenderPipe } from './Render';
import { NovoValueElement } from './Value';

@NgModule({
  imports: [CommonModule, NovoCommonModule, NovoIconModule],
  declarations: [NovoValueElement, RenderPipe, EntityList],
  exports: [NovoValueElement, RenderPipe, EntityList],
})
export class NovoValueModule {}
