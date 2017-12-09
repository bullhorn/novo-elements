// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoButtonModule } from './../button/button.module';
import { NovoHeaderComponent, NovoUtilActionComponent, NovoUtilsComponent } from './header.component';

@NgModule({
    imports: [CommonModule, NovoButtonModule],
    declarations: [NovoHeaderComponent, NovoUtilActionComponent, NovoUtilsComponent],
    exports: [NovoHeaderComponent, NovoUtilActionComponent, NovoUtilsComponent],
})
export class NovoHeaderModule {
}
