// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoButtonModule } from './../button/Button.module';
import { NovoPickerModule } from './../picker/Picker.module';
import { NovoSearchBoxElement } from './SearchBox';

@NgModule({
    imports: [CommonModule, NovoButtonModule, NovoPickerModule],
    declarations: [NovoSearchBoxElement],
    exports: [NovoSearchBoxElement]
})
export class NovoSearchBoxModule {
}
