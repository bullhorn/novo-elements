import { Component } from '@angular/core';
// Vendor
import { NovoTableConfig } from 'novo-elements';
import { HEADER_COLORS, TableData, TableColumns } from '../table-extras';

/**
 * @title Table Example
 */
@Component({
  selector: 'table-example',
  templateUrl: 'table-example.html',
  styleUrls: ['table-example.css'],
})
export class TableExample {
  public theme: string = HEADER_COLORS[0];
  public configuration: any = {
    columns: TableColumns.slice(),
    rows: [],
    config: {
      paging: {
        current: 1,
        itemsPerPage: 10,
        onPageChange: (event) => {
          this.configuration.config.paging.current = event.page;
          this.configuration.config.paging.itemsPerPage = event.itemsPerPage;
        },
      },
      filtering: true,
      sorting: true,
      ordering: true,
      resizing: true,
    },
  };

  reload() {
    this.configuration.rows = TableData.slice();
  }

  changeTheme() {
    let idx = HEADER_COLORS.indexOf(this.theme);
    if (idx === HEADER_COLORS.length - 1) {
      idx = -1;
    }
    this.theme = HEADER_COLORS[idx + 1];
  }
}
