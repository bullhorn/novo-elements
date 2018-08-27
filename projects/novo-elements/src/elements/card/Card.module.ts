// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoButtonModule } from '../button/Button.module';
import { NovoTooltipModule } from '../tooltip/Tooltip.module';
import { CardElement, CardActionsElement } from './Card';

@NgModule({
  imports: [CommonModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule],
  declarations: [CardElement, CardActionsElement],
  exports: [CardElement, CardActionsElement],
})
export class NovoCardModule {}
