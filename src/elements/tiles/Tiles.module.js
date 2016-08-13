// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { TilesElement } from './Tiles';

@NgModule({
    imports: [CommonModule],
    declarations: [TilesElement],
    exports: [TilesElement]
})
export class NovoTilesModule {
}
