// NG2
import { Component, Input } from '@angular/core';
// APP
let VerticalDemoTpl = require('./templates/VerticalDemo.html');
let HorizontalDemoTpl = require('./templates/HorizontalDemo.html');
let VerticalOptionsDemoTpl = require('./templates/VerticalOptionsDemo.html');
let HorizontalOptionsDemoTpl = require('./templates/HorizontalOptionsDemo.html');
// Vendor
import {
    FormUtils, TextBoxControl, CheckboxControl, CheckListControl, FileControl,
    QuickNoteControl, TilesControl, DateControl, TimeControl, DateTimeControl,
    PickerControl, EntityPickerResult, EntityPickerResults, TextAreaControl,
    NovoFormGroup, BaseControl, NovoControlGroupAddConfig, ReadOnlyControl
} from './../../../../index';

const template = `
<div class="container">
    <h1>Grouped Forms / Form Controls <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/form">(source)</a></small></h1>
    <p>Useful when needing to group smaller sections of forms, can be used in the larger form. Static or Dynamic too!</p>

    <h5>Horizontal</h5>
    <div class="example form-demo">${HorizontalDemoTpl}</div>
    <code-snippet [code]="HorizontalDemoTpl"></code-snippet>

    <h5>Horizontal (options)</h5>
    <div class="example form-demo">${HorizontalOptionsDemoTpl}</div>
    <code-snippet [code]="HorizontalOptionsDemoTpl"></code-snippet>

    <h5>Vertical</h5>
    <div class="example form-demo">${VerticalDemoTpl}</div>
    <code-snippet [code]="VerticalDemoTpl"></code-snippet>

    <h5>Horizontal (options)</h5>
    <div class="example form-demo">${VerticalOptionsDemoTpl}</div>
    <code-snippet [code]="VerticalOptionsDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'form-demo',
    template: template
})
export class FormGroupedDemoComponent {
    private HorizontalDemoTpl: string = HorizontalDemoTpl;
    private VerticalDemoTpl: string = VerticalDemoTpl;
    private HorizontalOptionsDemoTpl: string = HorizontalOptionsDemoTpl;
    private VerticalOptionsDemoTpl: string = VerticalOptionsDemoTpl;

    public horizontal: NovoFormGroup;
    public horizontalOptions: NovoFormGroup;
    public vertical: NovoFormGroup;
    public verticalOptions: NovoFormGroup;
    public controls: BaseControl[] = [];
    public initialValue: {}[] = [];

    public topAddConfig: NovoControlGroupAddConfig = {
        position: 'top',
        label: 'Add'
    };
    public bottomAddConfig: NovoControlGroupAddConfig = {
        position: 'bottom',
        label: 'Add a new fancy thing!'
    };

    constructor(private formUtils: FormUtils) {
        // Grouped form demo
        this.setupGroupedFormDemo();
    }

    setupGroupedFormDemo() {
        this.horizontal = this.formUtils.emptyFormGroup();
        this.vertical = this.formUtils.emptyFormGroup();
        this.horizontalOptions = this.formUtils.emptyFormGroup();
        this.verticalOptions = this.formUtils.emptyFormGroup();

        let label = new ReadOnlyControl({ key: 'label', value: 'Label :)' });
        let c1 = new TextBoxControl({ key: 'text', label: 'Text Box', tooltip: 'Textbox', value: 'HI', required: true });
        let c2 = new TextBoxControl({ type: 'percentage', key: 'percentage', label: 'Percent', required: true });
        let c3 = new CheckboxControl({ key: 'checkbox', label: 'Check Me!' });
        let c4 = new TextBoxControl({ key: 'test4', label: 'TEST4' });
        this.controls.push(label);
        this.controls.push(c1);
        this.controls.push(c2);
        this.controls.push(c3);
        this.controls.push(c4);
    }
}
