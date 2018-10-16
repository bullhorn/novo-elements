import { Component } from '@angular/core';
import { NOVO_VALUE_TYPE, NOVO_VALUE_THEME } from 'novo-elements';

/**
 * @title Category Value Example
 */
@Component({
  selector: 'category-value-example',
  templateUrl: 'category-value-example.html',
  styleUrls: ['category-value-example.css'],
})
export class CategoryValueExample {
  public theme = NOVO_VALUE_THEME.DEFAULT;
  public data: any = {
    value: 'stuff',
    label: 'Stuff Category',
  };
  public meta: any = {
    type: 'TO_ONE',
    name: 'category',
    label: 'Category',
    associatedEntity: {
      entity: 'Category',
    },
  };
}
