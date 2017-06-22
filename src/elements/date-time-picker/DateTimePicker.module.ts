// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoDateTimePickerElement } from './DateTimePicker';
import { NovoDatePickerModule } from '../date-picker/DatePicker.module';
import { NovoTimePickerModule } from '../time-picker/TimePicker.module';

@NgModule({
    imports: [CommonModule, FormsModule, NovoDatePickerModule, NovoTimePickerModule],
    declarations: [NovoDateTimePickerElement],
    exports: [NovoDateTimePickerElement]
})
export class NovoDateTimePickerModule {
}
