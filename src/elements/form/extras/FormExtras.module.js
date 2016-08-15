// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// APP
import { NovoSelectModule } from './../../../novo-elements';
import { NovoAddressElement } from './address/Address';
import { NovoCheckboxElement } from './checkbox/Checkbox';
import { NovoCheckListElement } from './checkbox/CheckList';

@NgModule({
    imports: [CommonModule, FormsModule, NovoSelectModule],
    declarations: [NovoAddressElement, NovoCheckboxElement, NovoCheckListElement],
    exports: [NovoAddressElement, NovoCheckboxElement, NovoCheckListElement]
})
export class NovoFormExtrasModule {
}
