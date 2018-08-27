import { Component } from '@angular/core';
import { NovoTableConfig } from 'novo-elements';
import { HEADER_COLORS, TableData, TableColumns } from '../table-extras';

/**
 * @title Select All Table Example
 */
@Component({
  selector: 'select-all-table-example',
  templateUrl: 'select-all-table-example.html',
  styleUrls: ['select-all-table-example.css'],
})
export class SelectAllTableExample {
  public theme: string = HEADER_COLORS[0];
  public configuration: any = {
    columns: TableColumns.slice(),
    rows: TableData.slice(),
    config: {
      paging: {
        current: 1,
        itemsPerPage: 10,
        onPageChange: (event) => {
          this.configuration.config.paging.current = event.page;
          this.configuration.config.paging.itemsPerPage = event.itemsPerPage;
        },
      },
      sorting: true,
      filtering: true,
      ordering: true,
      resizing: true,
      selectAllEnabled: true,
      rowSelectionStyle: 'checkbox',
    },
  };

  singleAction() {
    window.alert('Action!');
  }

  selectedAction(action) {
    window.alert(`You clicked ${action}!`);
  }
}
