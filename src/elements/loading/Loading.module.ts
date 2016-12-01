// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoLoadingElement, NovoSpinnerElement } from './Loading';

@NgModule({
    imports: [CommonModule],
    declarations: [NovoLoadingElement, NovoSpinnerElement],
    exports: [NovoLoadingElement, NovoSpinnerElement]
})
export class NovoLoadingModule {
}
