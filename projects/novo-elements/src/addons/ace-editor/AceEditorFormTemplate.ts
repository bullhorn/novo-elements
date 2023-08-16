import { Component, ViewChild } from '@angular/core';
import { NovoTemplate } from 'novo-elements/elements/common';
import { TemplateHost } from 'novo-elements/utils';

@Component({
    template:
    `<ng-template novoTemplate="ace-editor" let-control let-form="form" let-errors="errors" let-methods="methods">
      <div [formGroup]="form">
        <novo-ace-editor
          [name]="control.key"
          [formControlName]="control.key"
          (focus)="methods.handleFocus($event)"
          (blur)="methods.handleBlur($event)"
        ></novo-ace-editor>
      </div>
    </ng-template>`,
    selector: 'internal-novo-code-editor-template'
})
export class NovoAceEditorFormTemplate implements TemplateHost {
    @ViewChild(NovoTemplate)
    template: NovoTemplate;
}