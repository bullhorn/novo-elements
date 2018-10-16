import { Component } from '@angular/core';
import { NOVO_VALUE_TYPE, NOVO_VALUE_THEME } from 'novo-elements';

/**
 * @title Associated Value Example
 */
@Component({
  selector: 'associated-value-example',
  templateUrl: 'associated-value-example.html',
  styleUrls: ['associated-value-example.css'],
})
export class AssociatedValueExample {
  public theme = NOVO_VALUE_THEME.DEFAULT;
  public data: any = {
    id: 1,
    firstName: 'Alice',
    lastName: 'Wonderland',
  };
  public meta: any = {
    type: 'TO_ONE',
    name: 'owner',
    label: 'Owner',
    associatedEntity: {
      entity: 'CorporateUser',
    },
  };
}
