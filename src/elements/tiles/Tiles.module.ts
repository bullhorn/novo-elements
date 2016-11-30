// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoTilesElement } from './Tiles';

@NgModule({
    imports: [CommonModule],
    declarations: [NovoTilesElement],
    exports: [NovoTilesElement]
})
export class NovoTilesModule {
}
