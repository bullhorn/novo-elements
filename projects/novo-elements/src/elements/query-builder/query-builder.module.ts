import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovoAutoCompleteModule } from 'novo-elements/elements/autocomplete';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoCardModule } from 'novo-elements/elements/card';
import { NovoChipsModule } from 'novo-elements/elements/chips';
import { NovoCommonModule, NovoOptionModule, NovoOverlayModule } from 'novo-elements/elements/common';
import { NovoDatePickerModule } from 'novo-elements/elements/date-picker';
import { NovoDateTimePickerModule } from 'novo-elements/elements/date-time-picker';
import { NovoDropdownModule } from 'novo-elements/elements/dropdown';
import { NovoFieldModule } from 'novo-elements/elements/field';
import { NovoFlexModule } from 'novo-elements/elements/flex';
import { NovoFormModule } from 'novo-elements/elements/form';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import { NovoNonIdealStateModule } from 'novo-elements/elements/non-ideal-state';
import { GooglePlacesModule } from 'novo-elements/elements/places';
import { NovoRadioModule } from 'novo-elements/elements/radio'
import { NovoSearchBoxModule } from 'novo-elements/elements/search';
import { NovoSelectModule } from 'novo-elements/elements/select';
import { NovoSelectSearchModule } from 'novo-elements/elements/select-search';
import { NovoSwitchModule } from 'novo-elements/elements/switch';
import { NovoTabbedGroupPickerModule } from 'novo-elements/elements/tabbed-group-picker';
import { NovoTabModule } from 'novo-elements/elements/tabs';
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
import { NovoConditionTemplatesComponent } from './condition-templates/condition-templates.component';
import { NumberRangeComponent } from './number-range/number-range.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    CdkTableModule,
    GooglePlacesModule,
    NovoAutoCompleteModule,
    NovoButtonModule,
    NovoCommonModule,
    NovoFormModule,
    NovoSelectModule,
    NovoNonIdealStateModule,
    NovoFieldModule,
    NovoOptionModule,
    NovoFlexModule,
    NovoTabModule,
    NovoTabbedGroupPickerModule,
    NovoLoadingModule,
    NovoCardModule,
    NovoDatePickerModule,
    NovoDateTimePickerModule,
    NovoIconModule,
    NovoOverlayModule,
    NovoRadioModule,
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
    NovoDefaultDateTimeConditionDef,
    NovoConditionOperatorsDef,
    NovoConditionInputDef,
    NovoConditionFieldDef,
    NovoDefaultStringConditionDef,
    NovoDefaultNumberConditionDef,
    NovoDefaultIdConditionDef,
    NovoDefaultPickerConditionDef,
    NovoConditionTemplatesComponent,
    NumberRangeComponent,
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
    NovoConditionTemplatesComponent,
    NumberRangeComponent,
  ],
})
export class NovoQueryBuilderModule {}
