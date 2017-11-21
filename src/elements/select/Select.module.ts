// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
// APP
import { NovoOverlayModule } from '../overlay/Overlay.module';
import { NovoSelectElement } from './Select';

@NgModule({
    imports: [CommonModule, FormsModule, OverlayModule, NovoOverlayModule],
    declarations: [NovoSelectElement],
    exports: [NovoSelectElement]
})
export class NovoSelectModule {
}
