// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Vendor
import { IMaskDirectiveModule } from 'angular-imask';
// APP
import { NovoButtonModule } from '../button/Button.module';
import { NovoCheckboxModule } from '../checkbox';
import { NovoCommonModule, NovoOptionModule } from '../common';
import { NovoDatePickerModule } from '../date-picker/DatePicker.module';
import { NovoDropdownModule } from '../dropdown/Dropdown.module';
import { NovoFlexModule } from '../flex/Flex.module';
import { NovoFormExtrasModule } from '../form/extras/FormExtras.module';
import { NovoFormModule } from '../form/Form.module';
import { NovoIconModule } from '../icon/Icon.module';
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoToastModule } from '../toast/Toast.module';
import { NovoTooltipModule } from '../tooltip/Tooltip.module';
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
