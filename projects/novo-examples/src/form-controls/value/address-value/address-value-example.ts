import { Component } from '@angular/core';
import { NOVO_VALUE_THEME } from 'novo-elements';

/**
 * @title Address Value Example
 */
@Component({
  selector: 'address-value-example',
  templateUrl: 'address-value-example.html',
  styleUrls: ['address-value-example.css'],
})
export class AddressValueExample {
  theme = NOVO_VALUE_THEME.DEFAULT;
  data: any = {
    address1: '100 Summer Street',
    city: 'Boston',
    state: 'MA',
    zip: '02143',
    country: {
      name: 'United States',
    },
  };
  meta: any = {
    dataType: 'Address',
    type: 'Address',
    label: 'Address',
    name: 'address',
  };
}
