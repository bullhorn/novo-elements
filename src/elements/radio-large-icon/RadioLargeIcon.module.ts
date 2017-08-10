// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoButtonModule } from '../button/Button.module';
import { NovoRadioLargeIconElement, NovoRadioLargeIconGroup } from './RadioLargeIcon';

@NgModule({
    imports: [CommonModule, NovoButtonModule],
    declarations: [NovoRadioLargeIconElement, NovoRadioLargeIconGroup],
    exports: [NovoRadioLargeIconElement, NovoRadioLargeIconGroup]
})
export class NovoRadioLargeIconModule {
}
