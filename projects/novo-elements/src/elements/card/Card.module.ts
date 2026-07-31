// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
import { NovoCommonModule } from 'novo-elements/elements/common';
import { CardActionsElement, CardContentElement, CardElement, CardFooterElement, CardHeaderElement } from './Card';

@NgModule({
  imports: [CommonModule, NovoIconModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule, NovoCommonModule],
  declarations: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement],
  exports: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement],
})
export class NovoCardModule {}
