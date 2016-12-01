// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoDateTimePickerElement } from './DateTimePicker';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [NovoDateTimePickerElement],
    exports: [NovoDateTimePickerElement]
})
export class NovoDateTimePickerModule {
}
