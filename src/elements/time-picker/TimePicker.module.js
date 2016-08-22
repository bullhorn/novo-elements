// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoTimePickerElement } from './TimePicker';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [NovoTimePickerElement],
    exports: [NovoTimePickerElement]
})
export class NovoTimePickerModule {
}
