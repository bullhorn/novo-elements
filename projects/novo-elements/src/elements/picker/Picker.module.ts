// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// APP
import { NovoPipesModule } from 'novo-elements/pipes';
import { NovoCommonModule, NovoOverlayModule } from 'novo-elements/elements/common';
import { NovoListModule } from 'novo-elements/elements/list';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import { NovoSwitchModule } from 'novo-elements/elements/switch';
import { ChecklistPickerResults } from './extras/checklist-picker-results/ChecklistPickerResults';
import { DistributionListPickerResults } from './extras/distributionlist-picker-results/DistributionListPickerResults';
import { EntityPickerResult, EntityPickerResults } from './extras/entity-picker-results/EntityPickerResults';
import { GroupedMultiPickerResults } from './extras/grouped-multi-picker-results/GroupedMultiPickerResults';
import { MixedMultiPickerResults } from './extras/mixed-multi-picker-results/MixedMultiPickerResults';
import { PickerResults } from './extras/picker-results/PickerResults';
import { SkillsSpecialtyPickerResults } from './extras/skills-picker-results/SkillsSpecialtyPickerResults';
import { WorkersCompCodesPickerResults } from './extras/workers-comp-codes-picker-results/WorkersCompCodesPickerResults';
import { NovoPickerElement } from './Picker';

@NgModule({
  imports: [CommonModule, NovoPipesModule, FormsModule, NovoCommonModule, NovoLoadingModule, NovoListModule, NovoOverlayModule, NovoSwitchModule],
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
export class NovoPickerModule {}
