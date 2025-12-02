import { Component } from '@angular/core';

/**
 * @title Row Chips Example
 */
@Component({
    selector: 'row-chips-example',
    templateUrl: 'row-chips-example.html',
    styleUrls: ['row-chips-example.css'],
    standalone: false
})
export class RowChipsExample {
  public placeholder: string = 'Select...';
  public value: any;
  public rowDemo: any;
  public rowValue: any;

  constructor() {
    const collaborators = [
      {
        id: 1,
        shiftDate: '2021-04-03',
        openings: 1,
        closing: true,
      },
      {
        id: 2,
        shiftDate: '2021-04-06',
        openings: 1,
        closing: true,
      },
      {
        id: 3,
        shiftDate: '2021-04-10',
        openings: 1,
        closing: false,
      },
      {
        id: 4,
        shiftDate: '2021-04-12',
        openings: 1,
        closing: false,
      },
    ];
    this.rowValue = [];
    this.rowDemo = {
      format: '$shiftDate',
      options: collaborators,
      columns: [
        {
          label: 'Shift Date',
          data: (item: any): string => {
            return item.label;
          },
        },
        {
          label: 'Openings',
          editable: true,
          type: 'number',
          width: 80,
          name: 'openings',
          data: (item: any): string => {
            return item.value.openings;
          },
        },
        {
          label: 'Closing shift?',
          editable: false,
          type: 'checkbox',
          width: 260,
          name: 'closing',
          data: (item: any): string => {
            return item.value.closing;
          },
        },
      ],
    };
  }

  onChanged(event) {
    console.info('EVENT', event);
  }
}
