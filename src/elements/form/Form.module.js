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
    NovoNovoCKEditorModule
} from './../../novo-elements';
import { NovoDynamicFormElement, NovoControlElement } from './DynamicForm';
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
        NovoFormExtrasModule
    ],
    declarations: [NovoControlElement, NovoDynamicFormElement],
    exports: [NovoDynamicFormElement, NovoControlElement]
})
export class NovoFormModule {
}
