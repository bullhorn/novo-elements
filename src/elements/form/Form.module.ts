// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
// APP
import { NovoRadioModule } from './../radio/Radio.module';
import { NovoButtonModule } from './../button/Button.module';
import { NovoTilesModule } from './../tiles/Tiles.module';
import { NovoSelectModule } from './../select/Select.module';
import { NovoPickerModule } from './../picker/Picker.module';
import { NovoChipsModule } from './../chips/Chips.module';
import { NovoDatePickerModule } from './../date-picker/DatePicker.module';
import { NovoTimePickerModule } from './../time-picker/TimePicker.module';
import { NovoDateTimePickerModule } from './../date-time-picker/DateTimePicker.module';
import { NovoNovoCKEditorModule } from './../ckeditor/CKEditor.module';
import { NovoQuickNoteModule } from './../quick-note/QuickNote.module';
import { NovoDynamicFormElement, NovoControlCustom, NovoFieldsetElement, NovoFieldsetHeaderElement } from './DynamicForm';
import { NovoFormElement } from './Form';
import { NovoControlElement, NovoCustomControlContainerElement, NovoAutoSize } from './Control';
import { NovoFormExtrasModule } from './extras/FormExtras.module';
import { NovoHeaderModule } from './../header/Header.module';
import { NovoTooltipModule } from './../tooltip/Tooltip.module';
import { NovoDragulaModule } from './../dragula/Dragula.module';
import { NovoTipWellModule } from './../tip-well/TipWell.module';
import { NovoModalModule } from './../modal/Modal.module';
import { ControlConfirmModal } from './ControlConfirmModal';
import { NovoTabModule } from './../tabs/Tabs.module';
import { ScrollToModule } from 'ng2-scroll-to';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NovoRadioModule,
        NovoTilesModule,
        NovoSelectModule,
        NovoPickerModule,
        NovoChipsModule,
        NovoDatePickerModule,
        NovoTimePickerModule,
        NovoNovoCKEditorModule,
        NovoFormExtrasModule,
        NovoQuickNoteModule,
        NovoDateTimePickerModule,
        NovoHeaderModule,
        NovoTooltipModule,
        NovoDragulaModule,
        TextMaskModule,
        NovoTipWellModule,
        NovoModalModule,
        NovoButtonModule,
        NovoTabModule,
        ScrollToModule.forRoot()
    ],
    declarations: [NovoAutoSize, NovoControlElement, NovoDynamicFormElement, NovoFormElement, NovoFieldsetElement, NovoFieldsetHeaderElement, NovoControlCustom, NovoCustomControlContainerElement, ControlConfirmModal],
    exports: [NovoAutoSize, NovoDynamicFormElement, NovoControlElement, NovoFormElement, NovoFieldsetHeaderElement, NovoControlCustom, NovoCustomControlContainerElement],
    entryComponents: [ControlConfirmModal]
})
export class NovoFormModule {
}
