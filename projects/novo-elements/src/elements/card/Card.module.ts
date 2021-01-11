// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoButtonModule } from '../button/Button.module';
// APP
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoTooltipModule } from '../tooltip/Tooltip.module';
import { CardActionsElement, CardElement } from './Card';

@NgModule({
  imports: [CommonModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule],
  declarations: [CardElement, CardActionsElement],
  exports: [CardElement, CardActionsElement],
})
export class NovoCardModule {}
