// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoOverlayModule } from '../overlay/Overlay.module';
import { NovoListModule } from '../list/List.module';
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoSwitchModule } from '../switch/Switch.module';
import { NovoPickerElement } from './Picker';
import { PickerResults } from './extras/picker-results/PickerResults';
import { EntityPickerResult, EntityPickerResults } from './extras/entity-picker-results/EntityPickerResults';
import { ChecklistPickerResults } from './extras/checklist-picker-results/ChecklistPickerResults';
import { GroupedMultiPickerResults } from './extras/grouped-multi-picker-results/GroupedMultiPickerResults';
import { MixedMultiPickerResults } from './extras/mixed-multi-picker-results/MixedMultiPickerResults';
import { SkillsSpecialtyPickerResults } from './extras/skills-picker-results/SkillsSpecialtyPickerResults';
import { DistributionListPickerResults } from './extras/distributionlist-picker-results/DistributionListPickerResults';
import { WorkersCompCodesPickerResults } from './extras/workers-comp-codes-picker-results/WorkersCompCodesPickerResults';

@NgModule({
  imports: [CommonModule, FormsModule, NovoLoadingModule, NovoListModule, NovoOverlayModule, NovoSwitchModule],
  declarations: [
    NovoPickerElement,
    PickerResults,
    EntityPickerResult,
    EntityPickerResults,
    ChecklistPickerResults,
    GroupedMultiPickerResults,
    MixedMultiPickerResults,
    DistributionListPickerResults,
    WorkersCompCodesPickerResults,
    SkillsSpecialtyPickerResults,
  ],
  exports: [
    NovoPickerElement,
    PickerResults,
    EntityPickerResult,
    EntityPickerResults,
    ChecklistPickerResults,
    GroupedMultiPickerResults,
    MixedMultiPickerResults,
    DistributionListPickerResults,
    WorkersCompCodesPickerResults,
    SkillsSpecialtyPickerResults,
  ],
})
export class NovoPickerModule { }
