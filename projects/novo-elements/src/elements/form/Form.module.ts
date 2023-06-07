// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IMaskDirectiveModule } from 'angular-imask';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
// APP
import { NovoAceEditorModule } from 'novo-elements/addons/ace-editor';
import { NovoNovoCKEditorModule } from 'novo-elements/addons/ckeditor';
import { NovoDragulaModule } from 'novo-elements/addons/dragula';
import { NovoCheckboxModule } from 'novo-elements/elements/checkbox';
import { NovoCommonModule } from 'novo-elements/elements/common';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoSwitchModule } from 'novo-elements/elements/switch';
import { NovoTemplateService } from 'novo-elements/services';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoChipsModule } from 'novo-elements/elements/chips';
import { NovoDatePickerModule } from 'novo-elements/elements/date-picker';
import { NovoDateTimePickerModule } from 'novo-elements/elements/date-time-picker';
import { NovoHeaderModule } from 'novo-elements/elements/header';
import { NovoModalModule } from 'novo-elements/elements/modal';
import { NovoPickerModule } from 'novo-elements/elements/picker';
import { NovoQuickNoteModule } from 'novo-elements/elements/quick-note';
import { NovoRadioModule } from 'novo-elements/elements/radio';
import { NovoSelectModule } from 'novo-elements/elements/select';
import { NovoTilesModule } from 'novo-elements/elements/tiles';
import { NovoTimePickerModule } from 'novo-elements/elements/time-picker';
import { NovoTipWellModule } from 'novo-elements/elements/tip-well';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
import { NovoPopOverModule } from 'novo-elements/elements/popover';
import { NovoAutoSize, NovoControlElement } from './Control';
import { NovoControlGroup } from './ControlGroup';
import { NovoControlTemplates } from './ControlTemplates';
import { NovoDynamicFormElement, NovoFieldsetElement, NovoFieldsetHeaderElement } from './DynamicForm';
import { NovoFormExtrasModule } from './extras';
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
    NovoDateTimePickerModule,
    NovoNovoCKEditorModule,
    NovoFormExtrasModule,
    NovoQuickNoteModule,
    NovoDateTimePickerModule,
    NovoHeaderModule,
    NovoTooltipModule,
    NovoPopOverModule,
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
