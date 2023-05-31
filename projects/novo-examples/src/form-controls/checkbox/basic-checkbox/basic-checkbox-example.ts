import { Component } from '@angular/core';

/**
 * @title Basic Checkbox Usage
 */
@Component({
  selector: 'basic-checkbox-example',
  templateUrl: 'basic-checkbox-example.html',
  styleUrls: ['basic-checkbox-example.css'],
})
export class BasicCheckboxExample {
  items: any[] = [
    {
      name: 'Unchecked',
      isChecked: false,
      disabled: false,
    },
    {
      name: 'Checked',
      isChecked: true,
      disabled: false,
    },
    {
      name: 'Indeterminate',
      isChecked: true,
      disabled: false,
      indeterminate: true,
    },
    {
      name: 'Disabled',
      isChecked: false,
      disabled: true,
    },
    {
      name: 'Disabled and Checked',
      isChecked: true,
      disabled: true,
    },
    {
      name: 'Disabled and Indeterminate',
      isChecked: true,
      disabled: true,
      indeterminate: true,
    },
  ];
  onChange(change: Event, item): void {
    console.log('Checkbox Change:', change); // tslint:disable-line
    if (item.indeterminate) {
      item.indeterminate = false;
    }
  }
}
