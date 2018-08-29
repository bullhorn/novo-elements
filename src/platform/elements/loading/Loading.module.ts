// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoLoadingElement, NovoSpinnerElement, NovoSimpleSpinnerElement } from './Loading';

@NgModule({
    imports: [CommonModule],
    declarations: [NovoLoadingElement, NovoSpinnerElement, NovoSimpleSpinnerElement],
    exports: [NovoLoadingElement, NovoSpinnerElement, NovoSimpleSpinnerElement]
})
export class NovoLoadingModule {
}
