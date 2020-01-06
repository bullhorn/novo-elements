import { Component } from '@angular/core';
import { NOVO_VALUE_THEME } from 'novo-elements';

/**
 * @title Basic Value Example
 */
@Component({
  selector: 'basic-value-example',
  templateUrl: 'basic-value-example.html',
  styleUrls: ['basic-value-example.css'],
})
export class BasicValueExample {
  theme = NOVO_VALUE_THEME.MOBILE;
  data: any = 1234567890;
  meta: any = {
    type: 'SCALAR',
    name: 'phone1',
    label: 'PH #',
  };
}
