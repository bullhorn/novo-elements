// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoButtonModule } from './../button/Button.module';
import { NovoHeaderElement, UtilActionElement } from './Header';

@NgModule({
    imports: [CommonModule, NovoButtonModule],
    declarations: [NovoHeaderElement, UtilActionElement],
    exports: [NovoHeaderElement, UtilActionElement]
})
export class NovoHeaderModule {
}
