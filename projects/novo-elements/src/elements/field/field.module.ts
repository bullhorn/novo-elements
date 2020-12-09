// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoButtonModule } from '../button/Button.module';
// APP
import { NovoOverlayModule } from '../overlay/Overlay.module';
import { NovoErrorElement } from './error/error';
import { NovoFieldElement, NovoFieldPrefixDirective, NovoFieldSuffixDirective } from './field';
import { NovoFieldsElement } from './fieldset';
import { NovoDateFormatDirective } from './formats/date-format';
import { NovoTimeFormatDirective } from './formats/time-format';
import { NovoHintElement } from './hint/hint';
import { NovoInput } from './input';
import { NovoLabelElement } from './label/label';
import { NovoPickerDirective } from './picker.directive';
import { NovoPickerToggleElement } from './toggle/picker-toggle.component';
@NgModule({
  imports: [CommonModule, NovoButtonModule, NovoOverlayModule],
  declarations: [
    NovoFieldElement,
    NovoLabelElement,
    NovoHintElement,
    NovoErrorElement,
    NovoInput,
    NovoFieldPrefixDirective,
    NovoFieldSuffixDirective,
    NovoFieldsElement,
    NovoTimeFormatDirective,
    NovoDateFormatDirective,
    NovoPickerToggleElement,
    NovoPickerDirective,
  ],
  exports: [
    NovoFieldElement,
    NovoLabelElement,
    NovoHintElement,
    NovoErrorElement,
    NovoInput,
    NovoFieldPrefixDirective,
    NovoFieldSuffixDirective,
    NovoFieldsElement,
    NovoTimeFormatDirective,
    NovoDateFormatDirective,
    NovoPickerToggleElement,
    NovoPickerDirective,
  ],
})
export class NovoFieldModule {}
