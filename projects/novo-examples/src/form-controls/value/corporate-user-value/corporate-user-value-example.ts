import { Component } from '@angular/core';
import { NOVO_VALUE_TYPE, NOVO_VALUE_THEME } from 'novo-elements';

/**
 * @title Corporate User Value Example
 */
@Component({
  selector: 'corporate-user-value-example',
  templateUrl: 'corporate-user-value-example.html',
  styleUrls: ['corporate-user-value-example.css'],
})
export class CorporateUserValueExample {
  public theme = NOVO_VALUE_THEME.DEFAULT;
  public data: any = {
    id: 123,
    firstName: 'Jack',
    lastName: 'White',
  };
  public meta: any = {
    type: 'TO_ONE',
    name: 'user',
    label: 'Internal User',
    associatedEntity: {
      entity: 'CorporateUser',
    },
  };
}
