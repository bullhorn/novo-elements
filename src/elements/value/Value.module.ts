// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoValueElement, NovoValueEmail, NovoValuePhone, NOVO_VALUE_THEME, NOVO_VALUE_TYPE } from './Value';
import { RenderPipe } from './Render';

@NgModule({
    imports: [CommonModule],
    declarations: [NovoValueElement, NovoValueEmail, NovoValuePhone, RenderPipe],
    exports: [NovoValueElement,  NovoValueEmail, NovoValuePhone, RenderPipe]
})
export class NovoValueModule {
}
