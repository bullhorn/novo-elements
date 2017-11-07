// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { ValueElement, NovoValueItemRightElement } from './Value';
import { RenderPipe } from './Render';

@NgModule({
    imports: [CommonModule],
    declarations: [ValueElement, NovoValueItemRightElement, RenderPipe],
    exports: [ValueElement, NovoValueItemRightElement, RenderPipe]
})
export class NovoValueModule {
}
