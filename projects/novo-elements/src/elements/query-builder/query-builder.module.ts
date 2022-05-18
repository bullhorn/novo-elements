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
import { NovoFieldModule } from '../field';
import { NovoFlexModule } from '../flex';
import { NovoFormModule } from '../form';
import { NovoIconModule } from '../icon';
import { NovoLoadingModule } from '../loading';
import { NovoNonIdealStateModule } from '../non-ideal-state';
import { NovoSearchBoxModule } from '../search';
import { NovoSelectModule } from '../select';
import { NovoSwitchModule } from '../switch';
import { NovoTabModule } from '../tabs';
import { ExpressionBuilderComponent } from './expression-builder/expression-builder.component';
import {
  NovoFilterFieldDef,
  NovoFilterFieldInputDef,
  NovoFilterFieldOperatorsDef,
  NovoFilterFieldTypeDef,
} from './filter-builder/base-filter-field.definition';
import { NovoDefaultBooleanFilterFieldDef } from './filter-builder/default-condition-defs/boolean-filter-field.definition';
import { NovoDefaultDateFilterFieldDef } from './filter-builder/default-condition-defs/date-filter-field.definition';
import { NovoDefaultIdFilterFieldDef } from './filter-builder/default-condition-defs/id-filter-field.definition';
import { NovoDefaultNumberFilterFieldDef } from './filter-builder/default-condition-defs/number-filter-field.definition';
import { NovoDefaultPickerFilterFieldDef } from './filter-builder/default-condition-defs/picker-filter-field.definition';
import { NovoDefaultStringFilterFieldDef } from './filter-builder/default-condition-defs/string-filter-field.definition';
import { FilterBuilderComponent, QueryFilterInputOutlet, QueryFilterOperatorOutlet } from './filter-builder/filter-builder.component';
import { QueryBuilderComponent } from './query-builder.component';

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
  ],
  declarations: [
    ExpressionBuilderComponent,
    QueryBuilderComponent,
    FilterBuilderComponent,
    QueryFilterInputOutlet,
    QueryFilterOperatorOutlet,
    NovoDefaultBooleanFilterFieldDef,
    NovoDefaultDateFilterFieldDef,
    NovoFilterFieldOperatorsDef,
    NovoFilterFieldInputDef,
    NovoFilterFieldTypeDef,
    NovoFilterFieldDef,
    NovoDefaultStringFilterFieldDef,
    NovoDefaultNumberFilterFieldDef,
    NovoDefaultIdFilterFieldDef,
    NovoDefaultPickerFilterFieldDef,
  ],
  exports: [
    ExpressionBuilderComponent,
    QueryBuilderComponent,
    FilterBuilderComponent,
    NovoDefaultBooleanFilterFieldDef,
    NovoDefaultDateFilterFieldDef,
    NovoFilterFieldOperatorsDef,
    NovoFilterFieldInputDef,
    NovoFilterFieldTypeDef,
    NovoFilterFieldDef,
    NovoDefaultStringFilterFieldDef,
    NovoDefaultNumberFilterFieldDef,
    NovoDefaultIdFilterFieldDef,
    NovoDefaultPickerFilterFieldDef,
  ],
})
export class NovoQueryBuilderModule {}
