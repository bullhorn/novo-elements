// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoToastElement } from './Toast';
import { NovoToastService } from './ToastService';

@NgModule({
    imports: [CommonModule],
    declarations: [NovoToastElement],
    exports: [NovoToastElement],
    providers: [
        { provide: NovoToastService, useClass: NovoToastService }
    ]
})
export class NovoToastModule {
}
