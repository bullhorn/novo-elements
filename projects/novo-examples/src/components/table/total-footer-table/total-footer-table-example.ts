import { Component } from '@angular/core';
import { NovoTableConfig } from 'novo-elements';
import { HEADER_COLORS } from '../table-extras';

/**
 * @title Total Footer Table Example
 */
@Component({
  selector: 'total-footer-table-example',
  templateUrl: 'total-footer-table-example.html',
  styleUrls: ['total-footer-table-example.css'],
})
export class TotalFooterTableExample {
  public theme: string = HEADER_COLORS[0];
  public configuration: any = {
    columns: [
      { title: 'Name', name: 'name', ordering: true, filtering: true },
      { title: 'Count 1', name: 'count1', ordering: true, filtering: true },
      { title: 'Count 2', name: 'count2', ordering: true, filtering: true },
      { title: 'Count 3', name: 'count3', ordering: true, filtering: true },
    ],
    rows: [
      { id: 1, name: 'Name 1', count1: 1, count2: 2, count3: 3 },
      { id: 2, name: 'Name 2', count1: 1, count2: 2, count3: 3 },
      { id: 3, name: 'Name 3', count1: 1, count2: 2, count3: 3 },
      { id: 4, name: 'Name 4', count1: 1, count2: 2, count3: 3 },
      { id: 5, name: 'Name 5', count1: 1, count2: 2, count3: 3 },
    ],
    config: {
      paging: {
        current: 1,
        itemsPerPage: 10,
        onPageChange: (event) => {
          this.configuration.config.paging.current = event.page;
          this.configuration.config.paging.itemsPerPage = event.itemsPerPage;
        },
      },
      footers: [
        {
          columns: ['count1', 'count2', 'count3'],
          method: 'SUM',
          labelColumn: 'name',
          label: 'Mega Total',
        },
        {
          columns: ['count1', 'count2', 'count3'],
          method: 'AVG',
          labelColumn: 'name',
          label: 'Yep, Average!',
        },
      ],
      filtering: true,
      sorting: true,
      ordering: true,
      resizing: true,
    },
  };
}
