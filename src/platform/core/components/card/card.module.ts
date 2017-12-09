// NG2
import { NgModule } from '@angular/core';
// APP
import { NovoHeaderModule } from './../header/header.module';
import { NovoCardComponent } from './card.component';

@NgModule({
    imports: [NovoHeaderModule],
    declarations: [NovoCardComponent],
    exports: [NovoCardComponent],
})
export class NovoCardModule {
}
