// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoButtonModule } from './../button/Button.module';
import { NovoTooltipModule } from './../tooltip/Tooltip.module';
import { NovoDropdownModule } from './../dropdown/Dropdown.module';
import { NovoFormModule } from './../form/Form.module';
import { NovoLoadingModule } from './../loading/Loading.module';
import { NovoDatePickerModule } from './../date-picker/DatePicker.module';
import { NovoTableExtrasModule } from './extras/TableExtras.module';
import { NovoTableActionsElement, NovoTableElement, NovoTableHeaderElement, NovoTableFooterElement, NovoTableKeepFilterFocus } from './Table';
import { NovoFormExtrasModule } from './../form/extras/FormExtras.module';

@NgModule({
    imports: [CommonModule, FormsModule, NovoFormModule, NovoTableExtrasModule, NovoButtonModule, NovoTooltipModule, NovoDropdownModule, NovoLoadingModule, NovoDatePickerModule, NovoFormExtrasModule],
    declarations: [NovoTableActionsElement, NovoTableElement, NovoTableHeaderElement, NovoTableFooterElement, NovoTableKeepFilterFocus],
    exports: [NovoTableActionsElement, NovoTableElement, NovoTableHeaderElement, NovoTableFooterElement, NovoTableKeepFilterFocus]
})
export class NovoTableModule {
}
