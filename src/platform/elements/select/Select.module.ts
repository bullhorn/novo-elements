// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
// APP
import { NovoOverlayModule } from '../overlay/Overlay.module';
import { NovoSelectElement } from './Select';

@NgModule({
    imports: [CommonModule, FormsModule, OverlayModule, A11yModule, NovoOverlayModule],
    declarations: [NovoSelectElement],
    exports: [NovoSelectElement]
})
export class NovoSelectModule {
}
