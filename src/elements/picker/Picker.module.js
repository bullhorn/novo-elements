// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoLoadingModule, NovoListModule } from './../../novo-elements';
import { NovoPickerElement } from './Picker';
import { PickerResults } from './extras/picker-results/PickerResults';
import { EntityPickerResults } from './extras/entity-picker-results/EntityPickerResults';

@NgModule({
    imports: [CommonModule, FormsModule, NovoLoadingModule, NovoListModule],
    declarations: [NovoPickerElement, PickerResults, EntityPickerResults],
    exports: [NovoPickerElement, PickerResults, EntityPickerResults]
})
export class NovoPickerModule {
}
