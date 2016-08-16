// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// APP
import {
    NovoRadioModule,
    NovoTilesModule,
    NovoSelectModule,
    NovoPickerModule,
    NovoChipsModule,
    NovoDatePickerModule,
    NovoTimePickerModule,
    NovoNovoCKEditorModule,
    NovoQuickNoteModule
} from './../../novo-elements';
import { NovoDynamicFormElement } from './DynamicForm';
import { NovoFormElement } from './Form';
import { NovoControlElement } from './Control';
import { NovoFormExtrasModule } from './extras/FormExtras.module';

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
        NovoQuickNoteModule
    ],
    declarations: [NovoControlElement, NovoDynamicFormElement, NovoFormElement],
    exports: [NovoDynamicFormElement, NovoControlElement, NovoFormElement]
})
export class NovoFormModule {
}
