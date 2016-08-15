// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// APP
import { NovoSelectModule } from './../../../novo-elements';
import { NovoAddressElement } from './address/Address';

@NgModule({
    imports: [CommonModule, FormsModule, NovoSelectModule],
    declarations: [NovoAddressElement],
    exports: [NovoAddressElement]
})
export class NovoFormExtrasModule {
}
