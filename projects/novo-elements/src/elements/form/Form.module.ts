// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IMaskDirectiveModule } from 'angular-imask';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
import { NovoCheckboxModule } from '../checkbox';
import { NovoCommonModule } from '../common/common.module';
import { NovoIconModule } from '../icon';
import { NovoSwitchModule } from '../switch/Switch.module';
import { NovoTemplateService } from './../../services/template/NovoTemplateService';
import { NovoAceEditorModule } from './../ace-editor/AceEditor.module';
import { NovoButtonModule } from './../button/Button.module';
import { NovoChipsModule } from './../chips/Chips.module';
import { NovoNovoCKEditorModule } from './../ckeditor/CKEditor.module';
import { NovoDatePickerModule } from './../date-picker/DatePicker.module';
import { NovoDateTimePickerModule } from './../date-time-picker/DateTimePicker.module';
import { NovoDragulaModule } from './../dragula/Dragula.module';
import { NovoHeaderModule } from './../header/Header.module';
import { NovoModalModule } from './../modal/modal.module';
import { NovoPickerModule } from './../picker/Picker.module';
import { NovoQuickNoteModule } from './../quick-note/QuickNote.module';
// APP
import { NovoRadioModule } from './../radio/Radio.module';
import { NovoSelectModule } from './../select/Select.module';
import { NovoTilesModule } from './../tiles/Tiles.module';
import { NovoTimePickerModule } from './../time-picker/TimePicker.module';
import { NovoTipWellModule } from './../tip-well/TipWell.module';
import { NovoTooltipModule } from './../tooltip/Tooltip.module';
import { NovoAutoSize, NovoControlElement } from './Control';
import { NovoControlGroup } from './ControlGroup';
import { NovoControlTemplates } from './ControlTemplates';
import { NovoDynamicFormElement, NovoFieldsetElement, NovoFieldsetHeaderElement } from './DynamicForm';
import { NovoFormExtrasModule } from './extras/FormExtras.module';
import { ControlConfirmModal, ControlPromptModal } from './FieldInteractionModals';
import { NovoFormElement } from './Form';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
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
    IMaskDirectiveModule,
    TextMaskModule,
    NovoTipWellModule,
    NovoModalModule,
    NovoButtonModule,
    NovoAceEditorModule,
    NovoCommonModule,
    NovoCheckboxModule,
    NovoIconModule,
    NovoRadioModule,
    NovoSwitchModule,
  ],
  declarations: [
    NovoAutoSize,
    NovoControlElement,
    NovoDynamicFormElement,
    NovoFormElement,
    NovoFieldsetElement,
    NovoFieldsetHeaderElement,
    ControlConfirmModal,
    ControlPromptModal,
    NovoControlGroup,
    NovoControlTemplates,
  ],
  exports: [
    NovoAutoSize,
    NovoDynamicFormElement,
    NovoControlElement,
    NovoFormElement,
    NovoFieldsetHeaderElement,
    NovoControlGroup,
    NovoControlTemplates,
  ],
  providers: [NovoTemplateService],
})
export class NovoFormModule {}
