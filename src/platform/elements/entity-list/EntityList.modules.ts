// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityList } from './EntityList';

@NgModule({
    imports: [CommonModule],
    declarations: [EntityList],
    exports: [EntityList]
})
export class NovoEntityListModule {
}
