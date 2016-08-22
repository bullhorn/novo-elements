// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoDatePickerElement } from './DatePicker';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [NovoDatePickerElement],
    exports: [NovoDatePickerElement]
})
export class NovoDatePickerModule {
}
