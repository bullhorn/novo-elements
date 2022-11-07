// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CardActionsElement,
  CardContentElement,
  CardElement,
  CardFooterElement,
  CardHeaderElement,
} from './card';
import { NovoTooltipModule } from 'novo-elements/components/tooltip';
import { NovoLoadingModule } from 'novo-elements/components/loading';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoButtonModule } from 'novo-elements/components/button';

@NgModule({
  imports: [CommonModule, NovoIconModule, NovoButtonModule, NovoLoadingModule, NovoTooltipModule],
  declarations: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement],
  exports: [CardElement, CardActionsElement, CardContentElement, CardHeaderElement, CardFooterElement],
})
export class NovoCardModule {}
