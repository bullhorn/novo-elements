import { Component, Input } from '@angular/core';

// Vendor
import { FormUtils, PickerControl, EntityPickerResult, EntityPickerResults } from 'novo-elements';

// import { MockMeta, MockMetaHeaders } from './MockMeta';

/**
 * @title Picker Controls Example
 */
@Component({
  selector: 'picker-controls-example',
  templateUrl: 'picker-controls-example.html',
  styleUrls: ['picker-controls-example.css'],
})
export class PickerControlsExample {
  public singlePickerControl: any;
  public multiPickerControl: any;
  public entityMultiPickerControl: any;
  public pickerForm: any;

  constructor(private formUtils: FormUtils) {
    // Picker controls
    this.singlePickerControl = new PickerControl({
      key: 'singlePicker',
      tooltip: 'Single',
      label: 'Single',
      config: { options: ['One', 'Two', 'Three'] },
    });
    this.multiPickerControl = new PickerControl({
      key: 'multiPicker',
      tooltip: 'Multiple',
      label: 'Multiple',
      multiple: true,
      config: { options: ['One', 'Two', 'Three'], type: 'candidate' },
    });
    this.entityMultiPickerControl = new PickerControl({
      key: 'entityMultiPicker',
      label: 'Entities',
      required: true,
      readOnly: false,
      multiple: true,
      tooltip: 'Entities',
      config: {
        resultsTemplate: EntityPickerResults,
        previewTemplate: EntityPickerResult,
        format: '$title',
        options: [
          {
            title: 'Central Bank',
            name: 'Central Bank',
            email: 'new-bank-inquiries@centralbank.com',
            phone: '(651) 555-1234',
            address: { city: 'Washington', state: 'DC' },
            searchEntity: 'ClientCorporation',
          },
          {
            title: 'Federal Bank',
            name: 'Federal Bank',
            email: 'info@federalbank.com',
            phone: '(545) 555-1212',
            address: { city: 'Arlington', state: 'VA' },
            searchEntity: 'ClientCorporation',
          },
          {
            title: 'Aaron Burr',
            firstName: 'Aaron',
            lastName: 'Burr',
            name: 'Aaron Burr',
            companyName: 'Central Bank',
            email: 'aburr@centralbank.com',
            phone: '(333) 555-3434',
            address: { city: 'Washington', state: 'DC' },
            status: 'Hold',
            searchEntity: 'ClientContact',
          },
          {
            title: 'Alexander Hamilton',
            firstName: 'Alexander',
            lastName: 'Hamilton',
            name: 'Alexander Hamilton',
            companyName: 'Federal Bank',
            email: 'ahamilton@federalbank.com',
            phone: '(333) 555-2222',
            address: { city: 'Arlington', state: 'VA' },
            status: 'Active',
            searchEntity: 'ClientContact',
          },
          {
            title: 'Ben Franklin',
            firstName: 'Ben',
            lastName: 'Franklin',
            name: 'Ben Franklin',
            email: 'bfranklin@gmail.com',
            phone: '(654) 525-2222',
            address: { city: 'Boston', state: 'MA' },
            status: 'Interviewing',
            searchEntity: 'Candidate',
          },
          {
            title: 'Thomas Jefferson',
            firstName: 'Thomas',
            lastName: 'Jefferson',
            name: 'Thomas Jefferson',
            email: 'tjefferson@usa.com',
            phone: '(123) 542-1234',
            address: { city: 'Arlington', state: 'VA' },
            status: 'New Lead',
            searchEntity: 'Candidate',
          },
        ],
      },
    });
    let controls = [this.singlePickerControl, this.multiPickerControl, this.entityMultiPickerControl];
    formUtils.setInitialValues(controls, {
      entityMultiPicker: [
        {
          title: 'Federal Bank',
          name: 'Federal Bank',
          email: 'info@federalbank.com',
          phone: '(545) 555-1212',
          address: { city: 'Arlington', state: 'VA' },
          searchEntity: 'ClientCorporation',
        },
      ],
    });
    this.pickerForm = formUtils.toFormGroup(controls);
  }
}
