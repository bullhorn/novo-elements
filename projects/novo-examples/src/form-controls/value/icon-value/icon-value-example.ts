import { Component } from '@angular/core';
import { NOVO_VALUE_THEME } from 'novo-elements';

/**
 * @title Icon Value Example
 */
@Component({
  selector: 'icon-value-example',
  templateUrl: 'icon-value-example.html',
  styleUrls: ['icon-value-example.css'],
})
export class IconValueExample {
  theme = NOVO_VALUE_THEME.DEFAULT;
  data: any = 'Approved';
  meta: any = {
    type: 'SCALAR',
    options: [
      {
        value: 'Approved',
        label: 'Approved',
      },
    ],
    name: 'status',
    label: 'Status',
    icons: [
      {
        iconCls: 'next',
        onIconClick: (data, meta) => window.alert('hey there'),
      },
      {
        iconCls: 'close',
        onIconClick: (data, meta) => window.alert('hey there'),
      },
    ],
  };
}
