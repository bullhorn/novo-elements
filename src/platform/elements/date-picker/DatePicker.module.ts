// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
// APP
import { NovoOverlayModule } from '../overlay/Overlay.module';
import { NovoDatePickerElement } from './DatePicker';
import { NovoDatePickerInputElement } from './DatePickerInput';

@NgModule({
    imports: [CommonModule, FormsModule, NovoOverlayModule, TextMaskModule],
    declarations: [NovoDatePickerElement, NovoDatePickerInputElement],
    exports: [NovoDatePickerElement, NovoDatePickerInputElement],
})
export class NovoDatePickerModule {
}
