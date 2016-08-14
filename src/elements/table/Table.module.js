// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoButtonModule, NovoTooltipModule, NovoDropdownModule, NovoDatePickerModule } from './../../novo-elements';
import { NovoTableExtrasModule } from './extras/TableExtras.module';
import { NovoTableActionsElement, NovoTableElement, NovoTableHeaderElement } from './Table';

// import { NOVO_BUTTON_ELEMENTS } from '../button';
// import { NOVO_TOOLTIP_ELEMENTS } from '../tooltip';
// import { NOVO_DROPDOWN_ELEMENTS } from '../dropdown';
// import { NOVO_DATE_PICKER_ELEMENTS } from '../datepicker';
// import { NOVO_TABLE_EXTRA_ELEMENTS } from './extras/TableExtras';
// import { CheckBox } from '../form/extras/FormExtras';

// directives: [
//     NOVO_TABLE_EXTRA_ELEMENTS,
//     NgModel,
//     CORE_DIRECTIVES,
//     FORM_DIRECTIVES,
//     NOVO_BUTTON_ELEMENTS,
//     NOVO_DROPDOWN_ELEMENTS,
//     NOVO_TOOLTIP_ELEMENTS,
//     NOVO_DATE_PICKER_ELEMENTS,
//     CheckBox
// ],

@NgModule({
    imports: [CommonModule, FormsModule, NovoTableExtrasModule, NovoButtonModule, NovoTooltipModule, NovoDropdownModule, NovoDatePickerModule],
    declarations: [NovoTableActionsElement, NovoTableElement, NovoTableHeaderElement],
    exports: [NovoTableActionsElement, NovoTableElement, NovoTableHeaderElement]
})
export class NovoTableModule {
}
