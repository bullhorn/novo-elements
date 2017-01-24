// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoButtonModule } from './../button/Button.module';
import { NovoTooltipModule } from './../tooltip/Tooltip.module';
import { NovoDropdownModule } from './../dropdown/Dropdown.module';
import { NovoLoadingModule } from './../loading/Loading.module';
import { NovoDatePickerModule } from './../date-picker/DatePicker.module';
import { NovoTableExtrasModule } from './extras/TableExtras.module';
import { NovoTableActionsElement, NovoTableElement, NovoTableHeaderElement, NovoTableKeepFilterFocus } from './Table';
import { NovoFormExtrasModule } from './../form/extras/FormExtras.module';

@NgModule({
    imports: [CommonModule, FormsModule, NovoTableExtrasModule, NovoButtonModule, NovoTooltipModule, NovoDropdownModule, NovoLoadingModule, NovoDatePickerModule, NovoFormExtrasModule],
    declarations: [NovoTableActionsElement, NovoTableElement, NovoTableHeaderElement, NovoTableKeepFilterFocus],
    exports: [NovoTableActionsElement, NovoTableElement, NovoTableHeaderElement, NovoTableKeepFilterFocus]
})
export class NovoTableModule {
}
