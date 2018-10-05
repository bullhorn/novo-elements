import { Component } from '@angular/core';
import { NovoTableConfig, BaseRenderer } from 'novo-elements';
import { HEADER_COLORS, TableData, TableColumns } from '../table-extras';

@Component({
  selector: 'extra-details',
  template: `
    <div class="extra-data">
      <label><i class="bhi-info"></i>Description</label>
      <p>{{ data.description }}</p>
      <label><i class="bhi-info"></i>Categories</label>
      <p>{{ data.categories }}</p>
    </div>
  `,
})
export class ExtraDetails extends BaseRenderer {}

/**
 * @title Details Table Example
 */
@Component({
  selector: 'details-table-example',
  templateUrl: 'details-table-example.html',
  styleUrls: ['details-table-example.css'],
})
export class DetailsTableExample {
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
      hasDetails: true,
      detailsRenderer: ExtraDetails,
    },
  };
}
