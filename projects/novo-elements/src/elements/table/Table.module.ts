// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMaskDirectiveModule } from 'angular-imask';
// APP
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoCheckboxModule } from 'novo-elements/elements/checkbox';
import { NovoCommonModule, NovoOptionModule } from 'novo-elements/elements/common';
import { NovoDatePickerModule } from 'novo-elements/elements/date-picker';
import { NovoDropdownModule } from 'novo-elements/elements/dropdown';
import { NovoFlexModule } from 'novo-elements/elements/flex';
import { NovoFormExtrasModule } from 'novo-elements/elements/form';
import { NovoFormModule } from 'novo-elements/elements/form';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import { NovoToastModule } from 'novo-elements/elements/toast';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
import { NovoTableExtrasModule } from './extras/TableExtras.module';
import { NovoTableElement } from './Table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NovoFormModule,
    NovoTableExtrasModule,
    NovoToastModule,
    NovoButtonModule,
    NovoTooltipModule,
    NovoDropdownModule,
    NovoLoadingModule,
    NovoDatePickerModule,
    NovoFormExtrasModule,
    NovoCheckboxModule,
    IMaskDirectiveModule,
    NovoOptionModule,
    NovoCommonModule,
    NovoFlexModule,
    NovoIconModule,
  ],
  declarations: [NovoTableElement],
  exports: [NovoTableElement],
})
export class NovoTableModule {}
