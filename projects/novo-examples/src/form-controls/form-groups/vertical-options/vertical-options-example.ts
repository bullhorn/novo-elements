import { Component } from '@angular/core';
import { FormArray } from '@angular/forms';
import {
  FormUtils,
  TextBoxControl,
  CheckboxControl,
  NovoFormGroup,
  BaseControl,
  NovoControlGroupAddConfig,
  ReadOnlyControl,
  SelectControl,
} from 'novo-elements';

/**
 * @title Vertical Options Example
 */
@Component({
  selector: 'vertical-options-example',
  templateUrl: 'vertical-options-example.html',
  styleUrls: ['vertical-options-example.css'],
})
export class VerticalOptionsExample {
  public formGroup: NovoFormGroup;
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
    this.formGroup = this.formUtils.emptyFormGroup();
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
