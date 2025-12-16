import { Component } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import {
  BaseControl,
  CheckboxControl,
  FormUtils,
  NovoControlGroupAddConfig,
  NovoFormGroup,
  ReadOnlyControl,
  SelectControl,
  TextBoxControl,
} from 'novo-elements';

/**
 * @title Horizontal Options Example
 */
@Component({
    selector: 'horizontal-options-example',
    templateUrl: 'horizontal-options-example.html',
    styleUrls: ['horizontal-options-example.css'],
    standalone: false,
})
export class HorizontalOptionsExample {
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
    console.info('REMOVING', value);
  }

  public onEdit(value: any) {
    console.info('EDITING', value);
  }

  public canEdit(value: any, index: number) {
    console.info('canEdit', value, index);
    return index > 0;
  }
  public canRemove(value: any, index: number) {
    console.info('canRemove', value, index);
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
    console.info('DELETE', form, key, index);
    const control: UntypedFormArray = form.controls[key] as UntypedFormArray;
    control.removeAt(index);
  }

  public customEdit(form: NovoFormGroup, key: string, index: number) {
    console.info('EDIT', form, key, index);
  }

  private setupGroupedFormDemo() {
    this.formGroup = this.formUtils.emptyFormGroup();
    const label = new ReadOnlyControl({ key: 'label', value: 'Label :)' });
    const c1 = new SelectControl({ key: 'text', label: 'Text Box', options: [{ value: 'hello', label: 'Hello' }] });
    const c2 = new TextBoxControl({ type: 'percentage', key: 'percentage', label: 'Percent', required: true });
    const c3 = new CheckboxControl({ key: 'checkbox', label: 'Check Me!', width: 100 });
    const c4 = new TextBoxControl({ key: 'test4', label: 'TEST4' });
    this.controls.push(label);
    this.controls.push(c1);
    this.controls.push(c2);
    this.controls.push(c3);
    this.controls.push(c4);
  }
}
