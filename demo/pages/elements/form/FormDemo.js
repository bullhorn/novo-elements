// NG2
import { Component } from '@angular/core';
// APP
import DynamicFormDemoTpl from './templates/DynamicForm.html';
import VerticalDynamicFormDemoTpl from './templates/VerticalDynamicForm.html';
import TextBasedControlsDemoTpl from './templates/TextBasedControls.html';
import CheckBoxControlsDemoTpl from './templates/CheckBoxControls.html';
import MockMeta from './MockMeta';
// Vendor
import { NovoFormUtils, TextBoxControl, CheckboxControl, CheckListControl } from './../../../../src/novo-elements';

const template = `
<div class="container">
    <div class="example form-demo dynamic">${DynamicFormDemoTpl}</div>
    <code-snippet [code]="DynamicFormDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'form-demo',
    template: template
})
export class FormDemoComponent {
    constructor() {
        this.DynamicFormDemoTpl = DynamicFormDemoTpl;
        this.VerticalDynamicFormDemoTpl = VerticalDynamicFormDemoTpl;
        this.TextBasedControlsDemoTpl = TextBasedControlsDemoTpl;
        this.CheckBoxControlsDemoTpl = CheckBoxControlsDemoTpl;

        // Text-based Controls
        this.textControl = new TextBoxControl({ key: 'text', label: 'Text Box' });
        this.emailControl = new TextBoxControl({ type: 'email', key: 'email', label: 'Email' });
        this.numberControl = new TextBoxControl({ type: 'number', key: 'number', label: 'Number' });
        this.currencyControl = new TextBoxControl({ type: 'currency', key: 'currency', label: 'Currency', currencyFormat: '$ USD' });
        this.floatControl = new TextBoxControl({ type: 'float', key: 'float', label: 'Float' });
        this.percentageControl = new TextBoxControl({ type: 'percentage', key: 'percentage', label: 'Percent' });
        this.textForm = NovoFormUtils.toFormGroup([this.textControl, this.emailControl, this.numberControl, this.currencyControl, this.floatControl, this.percentageControl]);

        // Check box controls
        this.checkControl = new CheckboxControl({ key: 'check', label: 'Checkbox' });
        this.checkListControl = new CheckListControl({ key: 'checklist', label: 'Check List', options: ['One', 'Two', 'Three'] });
        this.checkForm = NovoFormUtils.toFormGroup([this.checkControl, this.checkListControl]);

        // Dynamic
        this.dynamic = NovoFormUtils.toControls(MockMeta, '$ USD', {}, 'TOKEN');
        NovoFormUtils.setInitialValues(this.dynamic, { firstName: 'Initial F Name' });
        this.dynamicForm = NovoFormUtils.toFormGroup(this.dynamic);
        this.dynamicVertical = NovoFormUtils.toControls(MockMeta, '$ USD', {}, 'TOKEN');
        this.dynamicVerticalForm = NovoFormUtils.toFormGroup(this.dynamicVertical);
    }

    save(form) {
        if (!form.isValid) {
            form.showOnlyRequired(true);
        } else {
            alert('SAVING'); // eslint-disable-line
        }
    }
}
