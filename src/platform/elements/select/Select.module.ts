// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// APP
import { NovoOverlayModule } from '../overlay/Overlay.module';
import { NovoSelectElement } from './Select';

@NgModule({
    imports: [CommonModule, FormsModule, NovoOverlayModule],
    declarations: [NovoSelectElement],
    exports: [NovoSelectElement]
})
export class NovoSelectModule {
}
