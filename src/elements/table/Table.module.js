// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoButtonModule, NovoTooltipModule, NovoDropdownModule, NovoDatePickerModule } from './../../novo-elements';
import { NovoTableExtrasModule } from './extras/TableExtras.module';
import { NovoTableActionsElement, NovoTableElement, NovoTableHeaderElement } from './Table';

@NgModule({
    imports: [CommonModule, FormsModule, NovoTableExtrasModule, NovoButtonModule, NovoTooltipModule, NovoDropdownModule, NovoDatePickerModule],
    declarations: [NovoTableActionsElement, NovoTableElement, NovoTableHeaderElement],
    exports: [NovoTableActionsElement, NovoTableElement, NovoTableHeaderElement]
})
export class NovoTableModule {
}
