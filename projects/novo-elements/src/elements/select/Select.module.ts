// NG
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// App
import { NovoPipesModule } from '../../pipes/Pipes.module';
import { NovoButtonModule } from '../button';
import { NovoOptionModule } from '../common';
import { NovoOverlayModule } from '../common/overlay';
import { NovoDividerModule } from '../divider';
import { NovoTooltipModule } from '../tooltip/Tooltip.module';
import { NovoSelectElement } from './Select';

@NgModule({
  imports: [
    A11yModule,
    CommonModule,
    FormsModule,
    NovoButtonModule,
    NovoDividerModule,
    NovoOptionModule,
    NovoOverlayModule,
    NovoPipesModule,
    NovoTooltipModule,
  ],
  declarations: [NovoSelectElement],
  exports: [NovoSelectElement],
})
export class NovoSelectModule {}
