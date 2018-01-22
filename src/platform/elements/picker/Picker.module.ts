// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
// APP
import { NovoOverlayModule } from '../overlay/Overlay.module';
import { NovoListModule } from '../list/List.module';
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoSwitchModule } from '../switch/Switch.module';
import { NovoPickerElement } from './Picker';
import { PickerResults } from './extras/picker-results/PickerResults';
import { NovoPickerContainer } from './extras/picker-container/PickerContainer';
import { EntityPickerResult, EntityPickerResults } from './extras/entity-picker-results/EntityPickerResults';
import { ChecklistPickerResults } from './extras/checklist-picker-results/ChecklistPickerResults';
import { GroupedMultiPickerResults } from './extras/grouped-multi-picker-results/GroupedMultiPickerResults';
import { SkillSpecialtyPickerResults } from './extras/skills-picker-results/SkillsSpecialtyPickerResults';
import { DistributionListPickerResults } from './extras/distributionlist-picker-results/DistributionListPickerResults';

@NgModule({
    imports: [CommonModule, FormsModule, NovoLoadingModule, NovoListModule, OverlayModule, NovoOverlayModule, NovoSwitchModule],
    declarations: [
        NovoPickerElement,
        NovoPickerContainer,
        PickerResults,
        EntityPickerResult,
        EntityPickerResults,
        ChecklistPickerResults,
        GroupedMultiPickerResults,
        DistributionListPickerResults,
        SkillSpecialtyPickerResults
    ],
    exports: [
        NovoPickerElement,
        NovoPickerContainer,
        PickerResults,
        EntityPickerResult,
        EntityPickerResults,
        ChecklistPickerResults,
        GroupedMultiPickerResults,
        DistributionListPickerResults,
        SkillSpecialtyPickerResults
    ],
    entryComponents: [
        PickerResults,
        EntityPickerResult,
        EntityPickerResults,
        ChecklistPickerResults,
        GroupedMultiPickerResults,
        DistributionListPickerResults,
        SkillSpecialtyPickerResults
    ]
})
export class NovoPickerModule {
}
