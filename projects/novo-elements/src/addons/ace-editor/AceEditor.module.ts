// NG2
import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
// APP
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovoCommonModule } from 'novo-elements/elements/common';
import { DYNAMIC_FORM_TEMPLATE, DynamicFormTemplateArgs } from 'novo-elements/utils';
import { NovoAceEditor } from './AceEditor';
import { NovoAceEditorFormTemplate } from './AceEditorFormTemplate';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NovoCommonModule],
  declarations: [NovoAceEditor, NovoAceEditorFormTemplate],
  exports: [NovoAceEditor],
  providers: [
    {
        provide: DYNAMIC_FORM_TEMPLATE,
        multi: true,
        deps: [NgModuleRef],
        useFactory: (mod) => {
            return {
                type: NovoAceEditorFormTemplate,
                ngModuleRef: mod
            } as DynamicFormTemplateArgs;
        }
    }
]
})
export class NovoAceEditorModule {}
