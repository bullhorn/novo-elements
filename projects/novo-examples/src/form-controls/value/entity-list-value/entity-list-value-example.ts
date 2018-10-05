import { Component } from '@angular/core';
import { NOVO_VALUE_TYPE, NOVO_VALUE_THEME } from 'novo-elements';

/**
 * @title Entity List Value Example
 */
@Component({
  selector: 'entity-list-value-example',
  templateUrl: 'entity-list-value-example.html',
  styleUrls: ['entity-list-value-example.css'],
})
export class EntityListValueExample {
  public theme = NOVO_VALUE_THEME.DEFAULT;
  public data: any = {
    data: [
      {
        id: 1,
        firstName: 'George',
        lastName: 'Washington',
        personSubtype: 'Candidate',
        openLink: (data) => {},
      },
      {
        id: 2,
        firstName: 'John',
        lastName: 'Adams',
        personSubtype: 'ClientContact',
        openLink: (data) => {},
      },
      {
        id: 3,
        firstName: 'Abraham',
        lastName: 'Lincoln',
        personSubtype: 'Lead',
        openLink: (data) => {},
      },
    ],
  };
  public meta: any = {
    type: 'TO_MANY',
    name: 'guests',
    label: 'Attendees',
    associatedEntity: {
      entity: 'CorporateUser',
    },
  };
}
