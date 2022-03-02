import { Component } from '@angular/core';
import { BaseControl, FormUtils, NovoFormGroup, TextBoxControl } from 'novo-elements';

/**
 * @title Date picker limits Example
 */
@Component({
  selector: 'date-picker-limits-example',
  templateUrl: 'date-picker-limits-example.html',
  styleUrls: ['date-picker-limits-example.css'],
})
export class DatePickerLimitsExample {
  startDate: Date = new Date();
  endDate: Date = new Date();
  tooltip: String = 'this is a disabled date tooltip';
  public initValue: {}[] = [{ tooltip: this.tooltip }];

  public formGroup: NovoFormGroup;
  public controls: BaseControl[] = [];

  constructor(private formUtils: FormUtils) {
    this.formGroup = this.formUtils.emptyFormGroup();
    const c1 = new TextBoxControl({ key: 'tooltip', label: 'what should your tooltip be?' });
    this.controls.push(c1);
  }

  public updateInitialValue() {
    this.tooltip = this.formGroup.value?.horizontal[0]?.tooltip;
    this.initValue = [{ tooltip: this.tooltip }];
  }
}
