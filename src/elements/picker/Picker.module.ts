// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoListModule } from '../list/List.module';
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoPickerElement } from './Picker';
import { PickerResults } from './extras/picker-results/PickerResults';
import { NovoPickerContainer } from './extras/picker-container/PickerContainer';
import { EntityPickerResult, EntityPickerResults } from './extras/entity-picker-results/EntityPickerResults';
import { ChecklistPickerResults } from './extras/checklist-picker-results/ChecklistPickerResults';

@NgModule({
    imports: [CommonModule, FormsModule, NovoLoadingModule, NovoListModule],
    declarations: [NovoPickerElement, NovoPickerContainer, PickerResults, EntityPickerResult, EntityPickerResults, ChecklistPickerResults],
    exports: [NovoPickerElement, NovoPickerContainer, PickerResults, EntityPickerResult, EntityPickerResults, ChecklistPickerResults],
    entryComponents: [PickerResults, EntityPickerResult, EntityPickerResults, ChecklistPickerResults]
})
export class NovoPickerModule {
}
