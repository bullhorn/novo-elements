// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoCommonModule } from 'novo-elements/common';
import { NovoOverlayModule } from 'novo-elements/common/overlay';
import { NovoListModule } from 'novo-elements/components/list';
import { NovoLoadingModule } from 'novo-elements/components/loading';
import { NovoSwitchModule } from 'novo-elements/components/switch';
import { NovoPipesModule } from 'novo-elements/pipes';
import { ChecklistPickerResults } from './extras/checklist-picker-results/checklist-picker-results';
import { DistributionListPickerResults } from './extras/distributionlist-picker-results/distribution-list-picker-results';
import { EntityPickerResult, EntityPickerResults } from './extras/entity-picker-results/entity-picker-results';
import { GroupedMultiPickerResults } from './extras/grouped-multi-picker-results/grouped-multi-picker-results';
import { MixedMultiPickerResults } from './extras/mixed-multi-picker-results/mixed-multi-picker-results';
import { PickerResults } from './extras/picker-results/picker-results';
import { SkillsSpecialtyPickerResults } from './extras/skills-picker-results/skills-specialty-picker-results';
import { WorkersCompCodesPickerResults } from './extras/workers-comp-codes-picker-results/workers-comp-codes-picker-results';
import { NovoPickerElement } from './picker';

@NgModule({
  imports: [
    CommonModule,
    NovoPipesModule,
    FormsModule,
    NovoCommonModule,
    NovoLoadingModule,
    NovoListModule,
    NovoOverlayModule,
    NovoSwitchModule,
  ],
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
