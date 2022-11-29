import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovoCommonModule, NovoOptionModule } from 'novo-elements/common';
import { NovoAutoCompleteModule } from 'novo-elements/components/autocomplete';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoCardModule } from 'novo-elements/components/card';
import { NovoChipsModule } from 'novo-elements/components/chips';
import { NovoDatePickerModule } from 'novo-elements/components/date-picker';
import { NovoDateTimePickerModule } from 'novo-elements/components/date-time-picker';
import { NovoDropdownModule } from 'novo-elements/components/dropdown';
import { NovoFieldModule } from 'novo-elements/components/field';
import { NovoFlexModule } from 'novo-elements/components/flex';
import { NovoFormModule } from 'novo-elements/components/form';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoLoadingModule } from 'novo-elements/components/loading';
import { NovoNonIdealStateModule } from 'novo-elements/components/non-ideal-state';
import { NovoRadioModule } from 'novo-elements/components/radio';
import { NovoSearchBoxModule } from 'novo-elements/components/search';
import { NovoSelectModule } from 'novo-elements/components/select';
import { NovoSelectSearchModule } from 'novo-elements/components/select-search';
import { NovoSwitchModule } from 'novo-elements/components/switch';
import { NovoTabModule } from 'novo-elements/components/tabs';
import { ConditionBuilderComponent, ConditionInputOutlet, ConditionOperatorOutlet } from './condition-builder/condition-builder.component';
import { NovoDefaultAddressConditionDef } from './condition-definitions/address-condition.definition';
import { NovoDefaultBooleanConditionDef } from './condition-definitions/boolean-condition.definition';
import { NovoDefaultDateConditionDef } from './condition-definitions/date-condition.definition';
import { NovoDefaultDateTimeConditionDef } from './condition-definitions/date-time-condition.definition';
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
    NovoDateTimePickerModule,
    NovoIconModule,
    NovoRadioModule,
    NovoSearchBoxModule,
    NovoSwitchModule,
    NovoChipsModule,
    NovoSelectSearchModule,
    NovoDropdownModule,
    NovoAutoCompleteModule,
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
    NovoDefaultDateTimeConditionDef,
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
    NovoDefaultDateTimeConditionDef,
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
