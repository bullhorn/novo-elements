import { Component } from '@angular/core';

// Vendor
import { FormUtils, AddressControl, findByCountryId } from 'novo-elements';

/**
 * @title Address Control Example
 */
@Component({
  selector: 'address-control-example',
  templateUrl: 'address-control-example.html',
  styleUrls: ['address-control-example.css'],
})
export class AddressControlExample {
  public addressControl: any;
  public secondaryAddressControl: any;
  public addressForm: any;
  public addressFormControls: any;
  public states: any[] = [
    {
      value: 'MA',
      label: 'Massachusetts',
      countryId: 1,
    },
    {
      value: 'NY',
      label: 'New York',
      countryId: 1,
    },
    {
      value: 'AB',
      label: 'Alberta',
      countryId: 2216,
    },
    {
      value: 'BC',
      label: 'British Columbia',
      countryId: 2216,
    },
    {
      value: 'MB',
      label: 'Manitoba',
      countryId: 2216,
    },
  ];

  constructor(private formUtils: FormUtils) {
    // Address control
    this.addressControl = new AddressControl({
      key: 'address',
      name: 'address',
      label: 'Address',
      tooltip: 'Address',
      config: {
        address1: {
          label: 'Address Line 1',
          required: true,
          maxlength: 20,
        },
        address2: {
          label: 'Address Line 2',
          required: true,
          maxlength: 15,
        },
        state: {
          label: 'State',
          required: true,
        },
        countryID: {
          label: 'Country',
          required: true,
        },
        city: {
          label: 'City',
          required: true,
        },
        zip: {
          label: 'Zipcode',
          required: true,
        },
      },
      value: {
        address1: '321 Summer Street',
        address2: '11 Washington Street',
        countryID: 1,
        countryName: 'United States',
        countryCode: 'US',
      },
    });
    this.secondaryAddressControl = new AddressControl({
      key: 'secondaryAddress',
      name: 'secondaryAddress',
      label: 'Secondary Address',
      tooltip: 'Secondary Address',
      config: {
        address1: {
          label: 'Address Line 1',
          maxlength: 20,
        },
        address2: {
          label: 'Address Line 2',
          maxlength: 15,
        },
        state: {
          label: 'State',
          pickerConfig: {
            field: 'value',
            format: '$label',
            options: (query, countryID) => {
              return Promise.resolve(this.getStateOptions(query, countryID));
            },
            getLabels: (value: number) => {
              return Promise.resolve(this.getStateLabel(value));
            },
          },
        },
        countryID: {
          label: 'Country',
          pickerConfig: {
            field: 'value',
            format: '$label',
            options: (query) => {
              return Promise.resolve(this.getCountryOptions(query));
            },
            getLabels: (value: number) => {
              return Promise.resolve(findByCountryId(value));
            },
          },
        },
        city: {
          label: 'City',
        },
        zip: {
          label: 'Zipcode',
        },
      },
      value: {
        address1: '123 Summer Street',
        address2: '10 Washington Street and stuff',
        countryID: 1,
      },
    });
    this.addressFormControls = [this.addressControl, this.secondaryAddressControl];
    this.addressForm = formUtils.toFormGroup(this.addressFormControls);
  }

  getStateOptions(filter: string = '', countryID: number): any[] {
    let states: any[] = this.states;
    if (countryID) {
      states = states.filter((state: any) => state.countryId === countryID);
    }
    if (filter && filter.length) {
      states = states.filter((state) => new RegExp(`${filter}`, 'gi').test(state.label));
    }
    return states;
  }

  getStateLabel(value: number): string {
    let state: any = this.states.find((s: any) => {
      return s.value === value;
    });
    if (state && state.label) {
      return state.label;
    }
    return '';
  }

  getCountryOptions(filter?: string): any[] {
    let countries: any = [
      {
        value: 2356,
        label: 'Uganda',
      },
      {
        value: 2357,
        label: 'Ukraine',
      },
      {
        value: 2358,
        label: 'United Arab Emirates',
      },
      {
        value: 2359,
        label: 'United Kingdom',
      },
      {
        value: 1,
        label: 'United States',
      },
      {
        value: 2443,
        label: 'United States Minor Outlying Islands',
      },
      {
        value: 2360,
        label: 'Uruguay',
      },
      {
        value: 2361,
        label: 'Uzbekistan',
      },
    ];
    if (filter && filter.length) {
      countries = countries.filter((country) => new RegExp(`${filter}`, 'gi').test(country.label));
    }
    return countries;
  }
}
