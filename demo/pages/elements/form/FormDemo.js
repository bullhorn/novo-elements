// NG2
import { Component } from '@angular/core';
// APP
import DynamicFormDemoTpl from './templates/DynamicForm.html';
import VerticalDynamicFormDemoTpl from './templates/VerticalDynamicForm.html';
import TextBasedControlsDemoTpl from './templates/TextBasedControls.html';
import CheckBoxControlsDemoTpl from './templates/CheckBoxControls.html';
import FileInputControlsDemoTpl from './templates/FileInputControls.html';
import MockMeta from './MockMeta';
// Vendor
import { FormUtils, TextBoxControl, CheckboxControl, CheckListControl, FileControl, QuickNoteControl, TilesControl } from './../../../../src/novo-elements';

const template = `
<div class="container">
    <h1>Forms <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/tree/master/src/elements/form">(source)</a></small></h1>
    <p>Forms use inputs and labels to submit user content. But you already knew that. What you may not know is that our forms come in two styles 'Static' and 'Dynamic'</p>
    <h2>Static Form</h2>
    <p>Static forms <code>&lt;novo-form /&gt;</code>.
    
    <h5>Textbox Based Controls</h5>
    <div class="example form-demo">${TextBasedControlsDemoTpl}</div>
    <code-snippet [code]="TextBasedControlsDemoTpl"></code-snippet>
    
    <h5>Checkbox Controls</h5>
    <div class="example form-demo">${CheckBoxControlsDemoTpl}</div>
    <code-snippet [code]="CheckBoxControlsDemoTpl"></code-snippet>

    <h5>File Input Controls</h5>
    <div class="example form-demo">${FileInputControlsDemoTpl}</div>
    <code-snippet [code]="FileInputControlsDemoTpl"></code-snippet>
    
    <h2>Dynamic Form</h2>
    <p>Dynamic forms are composed of one element, <code>&lt;novo-dynamic-form [controls]="controls"/&gt;</code> and allow you to pass in the controls and form and it will create the form for you.</p>
    
    <h5>Basic</h5>
    <div class="example form-demo dynamic">${DynamicFormDemoTpl}</div>
    <code-snippet [code]="DynamicFormDemoTpl"></code-snippet>
    
    <h5>Vertical</h5>
    <div class="example form-demo dynamic">${VerticalDynamicFormDemoTpl}</div>
    <code-snippet [code]="VerticalDynamicFormDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'form-demo',
    template: template
})
export class FormDemoComponent {
    constructor(formUtils:FormUtils) {
        this.DynamicFormDemoTpl = DynamicFormDemoTpl;
        this.VerticalDynamicFormDemoTpl = VerticalDynamicFormDemoTpl;
        this.TextBasedControlsDemoTpl = TextBasedControlsDemoTpl;
        this.CheckBoxControlsDemoTpl = CheckBoxControlsDemoTpl;
        this.FileInputControlsDemoTpl = FileInputControlsDemoTpl;
        // Quick note config
        this.quickNoteConfig = {
            triggers: {
                tags: '@',
                references: '#',
                boos: '^'
            },
            options: {
                tags: ['First', 'Second'],
                references: ['Third', 'Forth'],
                boos: ['Test']
            },
            renderer: {
                tags: (symbol, item) => {
                    return `<a class="tag">${symbol}${item.label}</a>`;
                },
                references: (symbol, item) => {
                    return `<a class="tag">${symbol}${item.label}</a>`;
                },
                boos: (symbol, item) => {
                    return `<strong>${symbol}${item.label}</strong>`;
                }
            }
        };
        // Text-based Controls
        this.textControl = new TextBoxControl({ key: 'text', label: 'Text Box' });
        this.emailControl = new TextBoxControl({ type: 'email', key: 'email', label: 'Email' });
        this.numberControl = new TextBoxControl({ type: 'number', key: 'number', label: 'Number' });
        this.currencyControl = new TextBoxControl({ type: 'currency', key: 'currency', label: 'Currency', currencyFormat: '$ USD' });
        this.floatControl = new TextBoxControl({ type: 'float', key: 'float', label: 'Float' });
        this.percentageControl = new TextBoxControl({ type: 'percentage', key: 'percentage', label: 'Percent' });
        this.quickNoteControl = new QuickNoteControl({ key: 'note', label: 'Note', config: this.quickNoteConfig });
        this.textForm = formUtils.toFormGroup([this.textControl, this.emailControl, this.numberControl, this.currencyControl, this.floatControl, this.percentageControl, this.quickNoteControl]);

        // Check box controls
        this.checkControl = new CheckboxControl({ key: 'check', label: 'Checkbox' });
        this.checkListControl = new CheckListControl({ key: 'checklist', label: 'Check List', options: ['One', 'Two', 'Three'] });
        this.tilesControl = new TilesControl({ key: 'tiles', label: 'Tiles', options: [{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }] });
        this.checkForm = formUtils.toFormGroup([this.checkControl, this.checkListControl, this.tilesControl]);

        // File input controls
        this.fileControl = new FileControl({ key: 'file', name: 'myfile', label: 'File' });
        this.multiFileControl = new FileControl({ key: 'files', name: 'myfiles', label: 'Multiple Files', multiple: true });
        this.fileForm = formUtils.toFormGroup([this.fileControl, this.multiFileControl]);

        // Dynamic
        this.dynamic = formUtils.toControls(MockMeta, '$ USD', {}, 'TOKEN');
        formUtils.setInitialValues(this.dynamic, { firstName: 'Initial F Name' });
        this.dynamicForm = formUtils.toFormGroup(this.dynamic);
        this.dynamicVertical = formUtils.toControls(MockMeta, '$ USD', {}, 'TOKEN');
        this.dynamicVerticalForm = formUtils.toFormGroup(this.dynamicVertical);
    }

    save(form) {
        if (!form.isValid) {
            form.showOnlyRequired(true);
        } else {
            alert('SAVING'); // eslint-disable-line
        }
    }

    clear() {
        this.dynamic.forEach(control => {
            control.forceClear.emit();
        });
    }

    onChange(value) {
        console.log('I changed!', value); // eslint-disable-line
    }
}
