import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovoButtonModule } from '../button';
import { NovoCardModule } from '../card';
import { NovoChipsModule } from '../chips';
import { NovoCommonModule, NovoOptionModule } from '../common';
import { NovoDatePickerModule } from '../date-picker';
import { NovoDropdownModule } from '../dropdown';
import { NovoFieldModule } from '../field';
import { NovoFlexModule } from '../flex';
import { NovoFormModule } from '../form';
import { NovoIconModule } from '../icon';
import { NovoLoadingModule } from '../loading';
import { NovoNonIdealStateModule } from '../non-ideal-state';
import { NovoSearchBoxModule } from '../search';
import { NovoSelectModule } from '../select';
import { NovoSelectSearchModule } from '../select-search';
import { NovoSwitchModule } from '../switch';
import { NovoTabModule } from '../tabs';
import { ConditionBuilderComponent, ConditionInputOutlet, ConditionOperatorOutlet } from './condition-builder/condition-builder.component';
import { NovoDefaultAddressConditionDef } from './condition-definitions/address-condition.definition';
import { NovoDefaultBooleanConditionDef } from './condition-definitions/boolean-condition.definition';
import { NovoDefaultDateConditionDef } from './condition-definitions/date-condition.definition';
import { NovoDefaultIdConditionDef } from './condition-definitions/id-condition.definition';
import { NovoDefaultNumberConditionDef } from './condition-definitions/number-condition.definition';
import { NovoDefaultPickerConditionDef } from './condition-definitions/picker-condition.definition';
import { NovoDefaultStringConditionDef } from './condition-definitions/string-condition.definition';
import { ConditionGroupComponent } from './condition-group/condition-group.component';
import { CriteriaBuilderComponent } from './criteria-builder/criteria-builder.component';
import { NovoConditionFieldDef, NovoConditionInputDef, NovoConditionOperatorsDef } from './query-builder.directives';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    CdkTableModule,
    NovoButtonModule,
    NovoCommonModule,
    NovoFormModule,
    NovoSelectModule,
    NovoNonIdealStateModule,
    NovoFieldModule,
    NovoOptionModule,
    NovoFlexModule,
    NovoTabModule,
    NovoLoadingModule,
    NovoCardModule,
    NovoDatePickerModule,
    NovoIconModule,
    NovoSearchBoxModule,
    NovoSwitchModule,
    NovoChipsModule,
    NovoSelectSearchModule,
    NovoDropdownModule,
  ],
  declarations: [
    CriteriaBuilderComponent,
    ConditionBuilderComponent,
    ConditionInputOutlet,
    ConditionOperatorOutlet,
    ConditionGroupComponent,
    NovoDefaultAddressConditionDef,
    NovoDefaultBooleanConditionDef,
    NovoDefaultDateConditionDef,
    NovoConditionOperatorsDef,
    NovoConditionInputDef,
    NovoConditionFieldDef,
    NovoDefaultStringConditionDef,
    NovoDefaultNumberConditionDef,
    NovoDefaultIdConditionDef,
    NovoDefaultPickerConditionDef,
  ],
  exports: [
    CriteriaBuilderComponent,
    ConditionBuilderComponent,
    NovoDefaultAddressConditionDef,
    NovoDefaultBooleanConditionDef,
    NovoDefaultDateConditionDef,
    NovoConditionOperatorsDef,
    NovoConditionInputDef,
    NovoConditionFieldDef,
    NovoDefaultStringConditionDef,
    NovoDefaultNumberConditionDef,
    NovoDefaultIdConditionDef,
    NovoDefaultPickerConditionDef,
  ],
})
export class NovoQueryBuilderModule {}
