// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoFieldElement, NovoFieldPrefixDirective, NovoFieldSuffixDirective } from './field';
import { NovoInput } from './input';
import { NovoLabelElement } from './label/label';
import { NovoHintElement } from './hint/hint';
import { NovoErrorElement } from './error/error';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NovoFieldElement,
    NovoLabelElement,
    NovoHintElement,
    NovoErrorElement,
    NovoInput,
    NovoFieldPrefixDirective,
    NovoFieldSuffixDirective,
  ],
  exports: [
    NovoFieldElement,
    NovoLabelElement,
    NovoHintElement,
    NovoErrorElement,
    NovoInput,
    NovoFieldPrefixDirective,
    NovoFieldSuffixDirective,
  ],
})
export class NovoFieldModule {}
