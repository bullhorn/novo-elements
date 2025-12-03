import { Component } from '@angular/core';

/**
 * @title Basic Checkbox Usage
 */
@Component({
    selector: 'basic-timezone-example',
    templateUrl: 'basic-timezone-example.html',
    styleUrls: ['basic-timezone-example.css'],
    standalone: false
})
export class BasicTimezoneExample {
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
    console.info('Checkbox Change:', change);
    if (item.indeterminate) {
      item.indeterminate = false;
    }
  }
}
