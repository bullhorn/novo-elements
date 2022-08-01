// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoButtonModule } from '../button/Button.module';
import { NovoCommonModule, NovoOptionModule } from '../common';
// APP
import { NovoOverlayModule } from '../common/overlay/Overlay.module';
import { NovoAutocompleteElement } from './autocomplete/autocomplete.component';
import { NovoErrorElement } from './error/error';
import { NovoFieldElement, NovoFieldPrefixDirective, NovoFieldSuffixDirective } from './field';
import { NovoFieldsElement } from './fieldset';
import { NovoDateFormatDirective } from './formats/date-format';
import { NovoDateRangeFormatDirective } from './formats/date-range-format';
import { NovoTimeFormatDirective } from './formats/time-format';
import { NovoHintElement } from './hint/hint';
import { NovoInput } from './input';
import { NovoPickerDirective } from './picker.directive';
import { NovoPickerToggleElement } from './toggle/picker-toggle.component';

@NgModule({
  imports: [CommonModule, NovoButtonModule, NovoOverlayModule, NovoOptionModule, NovoCommonModule],
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
    NovoDateRangeFormatDirective,
    NovoPickerToggleElement,
    NovoPickerDirective,
    NovoAutocompleteElement,
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
    NovoPickerToggleElement,
    NovoPickerDirective,
    NovoAutocompleteElement,
  ],
})
export class NovoFieldModule {}
