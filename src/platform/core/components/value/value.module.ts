// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoHeaderModule } from '../header/header.module';
import { NovoIconModule } from '../icon/icon.module';
import { NovoValueComponent } from './value.component';
import { RenderPipe } from './render.pipe';

@NgModule({
    imports: [CommonModule, NovoHeaderModule, NovoIconModule],
    declarations: [NovoValueComponent, RenderPipe],
    exports: [NovoValueComponent, RenderPipe],
})
export class NovoValueModule {
}
