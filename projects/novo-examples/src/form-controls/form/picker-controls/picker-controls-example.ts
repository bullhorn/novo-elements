import { Component } from '@angular/core';
// Vendor
import { EntityPickerResult, EntityPickerResults, FormUtils, PickerControl } from 'novo-elements';

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
  public multiPickerControlWithMaxlength: any;
  public multiPickerControlWithMaxlengthAndPreselects: any;
  public entityMultiPickerControl: any;
  public rowMultiPickerControl: any;
  public rowMultiPickerControlWithMaxlength: any;
  public textPickerWithGetLabels: any;
  public pickerForm: any;

  constructor(private formUtils: FormUtils) {
    const fruits = ['Apples', 'Oranges', 'Bananas', 'Grapes'];
    const cities = [
      {
        id: 1,
        name: 'Boston',
      },
      {
        id: 2,
        name: 'New York',
      },
      {
        id: 3,
        name: 'Washington D.C.',
      },
      {
        id: 4,
        name: 'Orlando',
      },
      {
        id: 5,
        name: 'Houston',
      },
      {
        id: 6,
        name: 'Chicago',
      },
    ];
    const states = [
      {
        value: 'ME',
        label: 'Maine',
      },
      {
        value: 'MD',
        label: 'Maryland',
      },
      {
        value: 'MA',
        label: 'Massachusetts',
      },
      {
        value: 'MI',
        label: 'Michigan',
      },
      {
        value: 'MN',
        label: 'Minnesota',
      },
      {
        value: 'MS',
        label: 'Mississippi',
      },
      {
        value: 'MO',
        label: 'Missouri',
      },
      {
        value: 'MT',
        label: 'Montana',
      },
    ];

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
    this.multiPickerControlWithMaxlength = new PickerControl({
      key: 'multiPickerWithMaxlength',
      tooltip: 'Multiple With Maxlength',
      label: 'Multiple With Maxlength',
      multiple: true,
      maxlength: 2,
      config: {
        options: fruits,
        type: 'candidate',
      },
    });
    this.multiPickerControlWithMaxlengthAndPreselects = new PickerControl({
      key: 'multiPickerControlWithMaxlengthAndPreselects',
      tooltip: 'Multiple With Maxlength and Preselects',
      label: 'Multiple With Maxlength & Preselects',
      readOnly: true,
      multiple: true,
      maxlength: 2,
      config: {
        options: fruits,
        type: 'candidate',
      },
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
    this.rowMultiPickerControl = new PickerControl({
      key: 'rowMultiPickerControl',
      tooltip: 'Multiple Rows',
      label: 'Multiple Rows',
      multiple: true,
      config: {
        format: '$name',
        options: cities,
        type: 'candidate',
        columns: [
          {
            label: 'Name',
            data: (item: any): string => {
              return item.label;
            },
          },
          {
            label: 'Id',
            data: (item: any): string => {
              return item.value.id;
            },
          },
        ],
      },
    });
    this.rowMultiPickerControlWithMaxlength = new PickerControl({
      key: 'rowMultiPickerControlWithMaxlength',
      tooltip: 'Multiple Rows With Maxlength',
      label: 'Multiple Rows With Maxlength',
      multiple: true,
      maxlength: 4,
      config: {
        format: '$name',
        options: cities,
        type: 'candidate',
        columns: [
          {
            label: 'Name',
            data: (item: any): string => {
              return item.label;
            },
          },
          {
            label: 'Id',
            data: (item: any): string => {
              return item.value.id;
            },
          },
        ],
      },
    });
    this.textPickerWithGetLabels = new PickerControl({
      key: 'textPickerWithGetLabels',
      tooltip: 'Text Value Picker with getLabels()',
      label: 'Text Value Picker with getLabels()',
      multiple: false,
      config: {
        field: 'value',
        format: '$label',
        options: states,
        useGetLabels: true,
        getLabels: (value) => {
          return new Promise((resolve) => {
            states.forEach((state) => {
              if (state.value === value) {
                resolve(state);
              }
            });
          });
        },
      },
    });
    const controls = [
      this.singlePickerControl,
      this.multiPickerControl,
      this.entityMultiPickerControl,
      this.multiPickerControlWithMaxlength,
      this.multiPickerControlWithMaxlengthAndPreselects,
      this.rowMultiPickerControl,
      // this.rowMultiPickerControlWithMaxlength,
      this.textPickerWithGetLabels,
    ];
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
      multiPickerControlWithMaxlengthAndPreselects: ['Oranges', 'Bananas'],
      rowMultiPickerControlWithMaxlength: [
        {
          id: 1,
          name: 'Boston',
        },
        {
          id: 5,
          name: 'Houston',
        },
        {
          id: 6,
          name: 'Chicago',
        },
      ],
      textPickerWithGetLabels: 'MD',
    });
    this.pickerForm = formUtils.toFormGroup(controls);
  }
}
