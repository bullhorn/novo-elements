// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
// APP
import { NovoOverlayModule } from '../overlay/Overlay.module';
import { NovoTimePickerElement } from './TimePicker';
import { NovoTimePickerInputElement } from './TimePickerInput';

@NgModule({
    imports: [CommonModule, FormsModule, TextMaskModule, NovoOverlayModule],
    declarations: [NovoTimePickerElement, NovoTimePickerInputElement],
    exports: [NovoTimePickerElement, NovoTimePickerInputElement]
})
export class NovoTimePickerModule {
}
