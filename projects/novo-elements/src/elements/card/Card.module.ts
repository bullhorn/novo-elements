// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoButtonModule } from '../button/Button.module';
import { NovoIconModule } from '../icon';
// APP
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoTooltipModule } from '../tooltip/Tooltip.module';
import { CardActionsElement, CardContentElement, CardElement, CardFooterElement, CardHeaderElement } from './Card';

@NgModule({
  imports: [CommonModule, NovoIconModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule],
  declarations: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement],
  exports: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement],
})
export class NovoCardModule {}
