// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// APP
import { NovoButtonModule, NovoSelectModule, NovoLoadingModule } from './../../../novo-elements';
import { NovoAddressElement } from './address/Address';
import { NovoCheckboxElement } from './checkbox/Checkbox';
import { NovoCheckListElement } from './checkbox/CheckList';
import { NovoFileInputElement } from './file/FileInput';

@NgModule({
    imports: [CommonModule, FormsModule, NovoButtonModule, NovoSelectModule, NovoLoadingModule],
    declarations: [NovoAddressElement, NovoCheckboxElement, NovoCheckListElement, NovoFileInputElement],
    exports: [NovoAddressElement, NovoCheckboxElement, NovoCheckListElement, NovoFileInputElement]
})
export class NovoFormExtrasModule {
}
