import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IMaskDirectiveModule } from 'angular-imask';
import { NovoCommonModule, NovoOptionModule } from 'novo-elements/common';
import { NovoOverlayModule } from 'novo-elements/common/overlay';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoErrorElement } from './error/error';
import { NovoFieldElement, NovoFieldPrefixDirective, NovoFieldSuffixDirective } from './field';
import { NovoFieldsElement } from './fieldset';
import { NovoDateFormatDirective } from './formats/date-format';
import { NovoDateRangeFormatDirective } from './formats/date-range-format';
import { NovoDateTimeFormatDirective } from './formats/date-time-format';
import { NovoTimeFormatDirective } from './formats/time-format';
import { NovoHintElement } from './hint/hint';
import { NovoInput } from './input';
import { NovoPickerDirective } from './picker.directive';
import { NovoPickerToggleElement } from './toggle/picker-toggle.component';

@NgModule({
  imports: [CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule, IMaskDirectiveModule],
  declarations: [
    NovoFieldElement,
    // NovoLabelElement,
    NovoHintElement,
    NovoErrorElement,
    NovoInput,
    NovoFieldPrefixDirective,
    NovoFieldSuffixDirective,
    NovoFieldsElement,
    NovoTimeFormatDirective,
    NovoDateFormatDirective,
    NovoDateTimeFormatDirective,
    NovoDateRangeFormatDirective,
    NovoPickerToggleElement,
    NovoPickerDirective,
  ],
  exports: [
    NovoFieldElement,
    // NovoLabelElement,
    NovoHintElement,
    NovoErrorElement,
    NovoInput,
    NovoFieldPrefixDirective,
    NovoFieldSuffixDirective,
    NovoFieldsElement,
    NovoTimeFormatDirective,
    NovoDateFormatDirective,
    NovoDateRangeFormatDirective,
    NovoDateTimeFormatDirective,
    NovoPickerToggleElement,
    NovoPickerDirective,
  ],
})
export class NovoFieldModule {}
