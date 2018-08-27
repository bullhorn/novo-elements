// NG2
import { Component, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
// APP
let VerticalDemoTpl = require('./templates/VerticalDemo.html');
let HorizontalDemoTpl = require('./templates/HorizontalDemo.html');
let VerticalOptionsDemoTpl = require('./templates/VerticalOptionsDemo.html');
let HorizontalOptionsDemoTpl = require('./templates/HorizontalOptionsDemo.html');
let CustomTemplateDemoTpl = require('./templates/CustomTemplateDemo.html');
// Vendor
import {
  FormUtils,
  TextBoxControl,
  CheckboxControl,
  CheckListControl,
  FileControl,
  QuickNoteControl,
  TilesControl,
  DateControl,
  TimeControl,
  DateTimeControl,
  PickerControl,
  EntityPickerResult,
  EntityPickerResults,
  TextAreaControl,
  NovoFormGroup,
  BaseControl,
  NovoControlGroupAddConfig,
  ReadOnlyControl,
  SelectControl,
} from 'novo-elements';

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

    <h5>Custom Template (you control everything!)</h5>
    <div class="example form-demo">${CustomTemplateDemoTpl}</div>
    <code-snippet [code]="CustomTemplateDemoTpl"></code-snippet>
</div>
`;

@Component({
  selector: 'form-demo',
  template: template,
})
export class FormGroupedDemoComponent {
  private HorizontalDemoTpl: string = HorizontalDemoTpl;
  private VerticalDemoTpl: string = VerticalDemoTpl;
  private HorizontalOptionsDemoTpl: string = HorizontalOptionsDemoTpl;
  private VerticalOptionsDemoTpl: string = VerticalOptionsDemoTpl;
  private CustomTemplateDemoTpl: string = CustomTemplateDemoTpl;

  public custom: NovoFormGroup;
  public horizontal: NovoFormGroup;
  public horizontalOptions: NovoFormGroup;
  public vertical: NovoFormGroup;
  public verticalOptions: NovoFormGroup;
  public controls: BaseControl[] = [];
  public initialValue: {}[] = [];
  public initValue: {}[] = [{ text: 'TEXT', percentage: 12, checkbox: true, test4: 'TEST' }];

  public simpleAddConfig: NovoControlGroupAddConfig = {
    label: 'Add',
  };
  public anotherAddConfig: NovoControlGroupAddConfig = {
    label: 'Add a new fancy thing!',
  };

  public emptyMessage: string = 'There are no items...';
  public canEditFunction: Function;
  public canRemoveFunction: Function;

  constructor(private formUtils: FormUtils) {
    // Grouped form demo
    this.setupGroupedFormDemo();
    // Setup function
    this.canEditFunction = this.canEdit.bind(this);
    this.canRemoveFunction = this.canRemove.bind(this);
  }

  public onRemove(value: any) {
    console.log('REMOVING', value); // tslint:disable-line
  }

  public onEdit(value: any) {
    console.log('EDITING', value); // tslint:disable-line
  }

  public canEdit(value: any, index: number) {
    console.log('canEdit', value, index); // tslint:disable-line
    return index > 0;
  }
  public canRemove(value: any, index: number) {
    console.log('canRemove', value, index); // tslint:disable-line
    return index === 0;
  }

  public updateInitialValue() {
    this.initValue = [
      { text: 'TEXT 111', percentage: 100, checkbox: false, test4: 'TEST 111' },
      { text: 'TEXT 222', percentage: 5, checkbox: false, test4: 'TEST 222' },
      { text: 'TEXT 333', percentage: 60, checkbox: true, test4: 'TEST 333' },
    ];
  }

  public customDelete(form: NovoFormGroup, key: string, index: number) {
    console.log('DELETE', form, key, index); // tslint:disable-line
    const control: FormArray = <FormArray>form.controls[key];
    control.removeAt(index);
  }

  public customEdit(form: NovoFormGroup, key: string, index: number) {
    console.log('EDIT', form, key, index); // tslint:disable-line
  }

  private setupGroupedFormDemo() {
    this.custom = this.formUtils.emptyFormGroup();
    this.horizontal = this.formUtils.emptyFormGroup();
    this.vertical = this.formUtils.emptyFormGroup();
    this.horizontalOptions = this.formUtils.emptyFormGroup();
    this.verticalOptions = this.formUtils.emptyFormGroup();

    let label = new ReadOnlyControl({ key: 'label', value: 'Label :)' });
    let c1 = new SelectControl({ key: 'text', label: 'Text Box', options: [{ value: 'hello', label: 'Hello' }] });
    let c2 = new TextBoxControl({ type: 'percentage', key: 'percentage', label: 'Percent', required: true });
    let c3 = new CheckboxControl({ key: 'checkbox', label: 'Check Me!', width: 100 });
    let c4 = new TextBoxControl({ key: 'test4', label: 'TEST4' });
    this.controls.push(label);
    this.controls.push(c1);
    this.controls.push(c2);
    this.controls.push(c3);
    this.controls.push(c4);
  }
}
