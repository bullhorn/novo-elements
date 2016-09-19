// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoButtonModule } from './../button/Button.module';
import { NovoModalContainerElement, NovoModalElement, NovoModalNotificationElement } from './Modal';
import { NovoModalService } from './ModalService';

@NgModule({
    imports: [CommonModule, NovoButtonModule],
    declarations: [NovoModalElement, NovoModalNotificationElement],
    exports: [NovoModalElement, NovoModalNotificationElement],
    providers: [
        { provide: NovoModalService, useClass: NovoModalService }
    ]
})
export class NovoModalModule {
}
