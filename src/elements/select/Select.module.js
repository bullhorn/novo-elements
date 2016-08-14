// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// APP
import { NovoSelectElement } from './Select';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [NovoSelectElement],
    exports: [NovoSelectElement]
})
export class NovoSelectModule {
}
