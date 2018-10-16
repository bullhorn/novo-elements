import { Component } from '@angular/core';

/**
 * @title Row Chips Example
 */
@Component({
  selector: 'row-chips-example',
  templateUrl: 'row-chips-example.html',
  styleUrls: ['row-chips-example.css'],
})
export class RowChipsExample {
  public placeholder: string = 'Select...';
  public value: any;
  public rowDemo: any;
  public rowValue: any;

  constructor() {
    let collaborators = [
      {
        id: 1,
        firstName: 'Brian',
        lastName: 'Kimball',
      },
      {
        id: 2,
        firstName: 'Josh',
        lastName: 'Godi',
      },
      {
        id: 3,
        firstName: 'Alec',
        lastName: 'Sibilia',
      },
      {
        id: 4,
        firstName: 'Kameron',
        lastName: 'Sween',
      },
    ];
    this.rowValue = [
      {
        id: 1,
        firstName: 'Brian',
        lastName: 'Kimball',
      },
    ];
    this.rowDemo = {
      format: '$firstName $lastName',
      options: collaborators,
      columns: [
        {
          label: 'Name',
          data: (item: any): string => {
            return item['label'];
          },
        },
        {
          label: 'Id',
          data: (item: any): string => {
            return item.value['id'];
          },
        },
      ],
    };
  }

  onChanged(event) {
    console.log('EVENT', event); // tslint:disable-line
  }
}
