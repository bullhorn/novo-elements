// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
// APP
import { NovoButtonModule } from '../button/Button.module';
import { NovoToastModule } from '../toast/Toast.module';
import { NovoTooltipModule } from '../tooltip/Tooltip.module';
import { NovoDropdownModule } from '../dropdown/Dropdown.module';
import { NovoFormModule } from '../form/Form.module';
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoDatePickerModule } from '../date-picker/DatePicker.module';
import { NovoTableExtrasModule } from './extras/TableExtras.module';
import { NovoTableElement } from './Table';
import { NovoFormExtrasModule } from '../form/extras/FormExtras.module';

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
    TextMaskModule,
  ],
  declarations: [NovoTableElement],
  exports: [NovoTableElement],
})
export class NovoTableModule {}
