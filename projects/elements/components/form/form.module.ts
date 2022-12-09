// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IMaskDirectiveModule } from 'angular-imask';
// Vendor
import { NovoAceEditorModule } from 'novo-elements/addons/ace-editor';
import { NovoNovoCKEditorModule } from 'novo-elements/addons/ck-editor';
import { NovoDragulaModule } from 'novo-elements/addons/dragula';
import { NovoCommonModule } from 'novo-elements/common';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoCheckboxModule } from 'novo-elements/components/checkbox';
import { NovoChipsModule } from 'novo-elements/components/chips';
import { NovoDatePickerModule } from 'novo-elements/components/date-picker';
import { NovoDateTimePickerModule } from 'novo-elements/components/date-time-picker';
import { NovoHeaderModule } from 'novo-elements/components/header';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoModalModule } from 'novo-elements/components/modal';
import { NovoPickerModule } from 'novo-elements/components/picker';
import { NovoQuickNoteModule } from 'novo-elements/components/quick-note';
import { NovoRadioModule } from 'novo-elements/components/radio';
import { NovoSelectModule } from 'novo-elements/components/select';
import { NovoSwitchModule } from 'novo-elements/components/switch';
import { NovoTilesModule } from 'novo-elements/components/tiles';
import { NovoTimePickerModule } from 'novo-elements/components/time-picker';
import { NovoTipWellModule } from 'novo-elements/components/tip-well';
import { NovoTooltipModule } from 'novo-elements/components/tooltip';
import { NovoTemplateService } from 'novo-elements/services';
import { NovoAutoSize, NovoControlElement } from './control';
import { NovoControlGroup } from './control-group';
import { NovoControlTemplates } from './control-templates';
import { NovoDynamicFormElement, NovoFieldsetElement, NovoFieldsetHeaderElement } from './dynamic-form';
import { NovoFormExtrasModule } from './extras';
import { ControlConfirmModal, ControlPromptModal } from './field-interaction-modals';
import { NovoFormElement } from './form';

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
