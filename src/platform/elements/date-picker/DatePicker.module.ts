// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
import { MomentModule, DateFormatPipe } from 'angular2-moment';
// APP
import { NovoOverlayModule } from '../overlay/Overlay.module';
import { NovoDatePickerElement } from './DatePicker';
import { NovoDatePickerInputElement } from './DatePickerInput';

@NgModule({
    imports: [CommonModule, FormsModule, NovoOverlayModule, TextMaskModule, MomentModule],
    declarations: [NovoDatePickerElement, NovoDatePickerInputElement],
    exports: [NovoDatePickerElement, NovoDatePickerInputElement],
    providers: [DateFormatPipe]
})
export class NovoDatePickerModule {
}
