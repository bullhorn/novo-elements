// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// APP
import { NovoRadioModule } from './../radio/Radio.module';
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
import { NovoControlElement, NovoCustomControlContainerElement } from './Control';
import { NovoFormExtrasModule } from './extras/FormExtras.module';
import { NovoHeaderModule } from './../header/Header.module';
import { NovoTooltipModule } from './../tooltip/Tooltip.module';
import { NovoDragulaModule } from './../dragula/Dragula.module';

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
        NovoDragulaModule
    ],
    declarations: [NovoControlElement, NovoDynamicFormElement, NovoFormElement, NovoFieldsetElement, NovoFieldsetHeaderElement, NovoControlCustom, NovoCustomControlContainerElement],
    exports: [NovoDynamicFormElement, NovoControlElement, NovoFormElement, NovoFieldsetHeaderElement, NovoControlCustom, NovoCustomControlContainerElement]
})
export class NovoFormModule {
}
