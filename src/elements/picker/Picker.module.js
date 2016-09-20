// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoListModule } from './../list/List.module';
import { NovoLoadingModule } from './../loading/Loading.module';
import { NovoPickerElement } from './Picker';
import { PickerResults } from './extras/picker-results/PickerResults';
import { EntityPickerResults } from './extras/entity-picker-results/EntityPickerResults';

@NgModule({
    imports: [CommonModule, FormsModule, NovoLoadingModule, NovoListModule],
    declarations: [NovoPickerElement, PickerResults, EntityPickerResults],
    exports: [NovoPickerElement, PickerResults, EntityPickerResults],
    entryComponents: [PickerResults, EntityPickerResults]
})
export class NovoPickerModule {
}
