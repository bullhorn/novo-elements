// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoRadioElement } from './Radio';

@NgModule({
    imports: [CommonModule],
    declarations: [NovoRadioElement],
    exports: [NovoRadioElement]
})
export class NovoRadioModule {
}
