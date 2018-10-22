import { Component } from '@angular/core';
import { NOVO_VALUE_TYPE, NOVO_VALUE_THEME } from 'novo-elements';

/**
 * @title Formatter Value Example
 */
@Component({
  selector: 'formatter-value-example',
  templateUrl: 'formatter-value-example.html',
  styleUrls: ['formatter-value-example.css'],
})
export class FormatterValueExample {
  public theme = NOVO_VALUE_THEME.DEFAULT;
  public data: any = {
    id: 123,
  };
  public meta: any = {
    type: 'SCALAR',
    name: 'Placement',
    label: 'Placement',
    associatedEntity: {
      entity: 'Placement',
    },
    showEntityIcon: true,
    entityIconClass: 'candidate',
    formatter: (value, args) => {
      return `${args.label} #${(value && value.id) || ''}`;
    },
  };
}
