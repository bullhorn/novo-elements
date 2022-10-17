import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTableState } from './state/data-table-state.service';
import { NovoDataTableSortFilter } from './sort-filter/sort-filter.directive';
import { NovoDataTableSortButton } from './sort-filter/sort-button.component';
import { NovoDataTableRow } from './rows/data-table-row.component';
import { NovoDataTableHeaderRow } from './rows/data-table-header-row.component';
import { NovoDataTablePagination } from './pagination/data-table-pagination.component';

import {
  DataTableBigDecimalRendererPipe,
  DataTableInterpolatePipe,
  DateTableCurrencyRendererPipe,
  DateTableDateRendererPipe,
  DateTableDateTimeRendererPipe,
  DateTableNumberRendererPipe,
  DateTableTimeRendererPipe,
} from './data-table.pipes';

import { NovoDataTable } from './data-table.component';
import { NovoDataTableExpandDirective } from './data-table-expand.directive';
import { NovoDataTableClearButton } from './data-table-clear-button.component';
import { NovoDataTableExpandCell } from './cells/data-table-expand-cell.component';
import { NovoDataTableCheckboxCell } from './cells/data-table-checkbox-cell.component';
import { NovoDataTableCell } from './cells/data-table-cell.component';
import { NovoDataTableHeaderCell } from './cell-headers/data-table-header-cell.directive';
import { NovoDataTableCellHeader } from './cell-headers/data-table-header-cell.component';
import { NovoDataTableExpandHeaderCell } from './cell-headers/data-table-expand-header-cell.component';
import { NovoDataTableCheckboxHeaderCell } from './cell-headers/data-table-checkbox-header-cell.component';
import { NovoTooltipModule } from 'novo-elements/components/tooltip';
import { NovoTilesModule } from 'novo-elements/components/tiles';
import { NovoSelectModule } from 'novo-elements/components/select';
import { NovoSearchBoxModule } from 'novo-elements/components/search';
import { NovoLoadingModule } from 'novo-elements/components/loading';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoFormExtrasModule } from 'novo-elements/components/form/extras';
import { NovoFlexModule } from 'novo-elements/components/flex';
import { NovoFieldModule } from 'novo-elements/components/field';
import { NovoDropdownModule } from 'novo-elements/components/dropdown';
import { NovoDatePickerModule } from 'novo-elements/components/date-picker';
import { NovoCommonModule, NovoOptionModule } from 'novo-elements/common';
import { NovoCheckboxModule } from 'novo-elements/components/checkbox';
import { NovoButtonModule } from 'novo-elements/components/button';

@NgModule({
  imports: [
    NovoDatePickerModule,
    CdkTableModule,
    CommonModule,
    FormsModule,
    NovoIconModule,
    NovoButtonModule,
    NovoDropdownModule,
    NovoFormExtrasModule,
    NovoLoadingModule,
    NovoTilesModule,
    NovoSearchBoxModule,
    NovoOptionModule,
    NovoCommonModule,
    NovoSelectModule,
    NovoTooltipModule,
    NovoCheckboxModule,
    NovoFlexModule,
    NovoFieldModule,
  ],
  declarations: [
    DataTableInterpolatePipe,
    DateTableDateRendererPipe,
    DateTableCurrencyRendererPipe,
    DateTableDateTimeRendererPipe,
    DateTableNumberRendererPipe,
    DateTableTimeRendererPipe,
    DataTableBigDecimalRendererPipe,
    NovoDataTableCellHeader,
    NovoDataTableSortFilter,
    NovoDataTableHeaderCell,
    NovoDataTableCell,
    NovoDataTableHeaderRow,
    NovoDataTableRow,
    NovoDataTablePagination,
    NovoDataTableCheckboxCell,
    NovoDataTableCheckboxHeaderCell,
    NovoDataTableExpandCell,
    NovoDataTableExpandHeaderCell,
    NovoDataTable,
    NovoDataTableExpandDirective,
    NovoDataTableClearButton,
    NovoDataTableSortButton,
  ],
  providers: [DataTableState],
  exports: [
    NovoDataTable,
    DataTableInterpolatePipe,
    DateTableDateRendererPipe,
    DateTableCurrencyRendererPipe,
    DateTableDateTimeRendererPipe,
    DateTableNumberRendererPipe,
    DateTableTimeRendererPipe,
    DataTableBigDecimalRendererPipe,
    NovoDataTableClearButton,
    NovoDataTableSortButton,
  ],
})
export class NovoDataTableModule {}
