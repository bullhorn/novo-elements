import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';

import { NovoButtonModule } from '../button/Button.module';
import { NovoDropdownModule } from '../dropdown/Dropdown.module';
import { NovoFormExtrasModule } from '../form/extras/FormExtras.module';
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoTilesModule } from '../tiles/Tiles.module';
import { NovoSearchBoxModule } from '../search/SearchBox.module';
import { NovoDatePickerModule } from '../date-picker/DatePicker.module';
import { NovoCommonModule } from '../common/common.module';
import { NovoSelectModule } from '../select/Select.module';

import { NovoDataTable } from './data-table.component';
import { NovoDataTableActionCell } from './cells/data-table-action-cell.component';
import { NovoDataTableCell } from './cells/data-table-cell.component';
import { NovoDataTableCheckboxCell } from './cells/data-table-checkbox-cell.component';
import { NovoDataTableHeaderRow } from './rows/data-table-header-row.component';
import { NovoDataTableRow } from './rows/data-table-row.component';
import { NovoDataTableCellHeader } from './cell-headers/data-table-header-cell.component';
import { NovoDataTableCheckboxHeaderCell } from './cell-headers/data-table-checkbox-header-cell.component';
import { NovoDataTableEmptyHeaderCell } from './cell-headers/data-table-empty-header-cell.directive';
import { NovoDataTableHeaderCell } from './cell-headers/data-table-header-cell.directive';
import { NovoDataTableSortFilter } from './sort-filter/sort-filter.directive';
import { NovoDataTableSelection } from './selection/data-table-selection.directive';
import { NovoDataTablePagination } from './pagination/data-table-pagination.component';
import { DataTableState } from './state/data-table-state.service';
import {
  DataTableInterpolatePipe,
  DateTableDateRendererPipe,
  DateTableCurrencyRendererPipe,
  DateTableDateTimeRendererPipe,
  DateTableNumberRendererPipe,
  DateTableTimeRendererPipe,
} from './data-table.pipes';

import { NovoDataTableHeaderCellDef } from './cell-headers/defs/data-table-header-cell-def.directive';
import { NovoDataTableColumnDef } from './cells/defs/data-table-column-def.directive';
import { NovoDataTableCellDef } from './cells/defs/data-table-cell-def.directive';
import { NovoDataTableHeaderRowDef } from './rows/defs/data-table-header-row-def.directive';
import { NovoDataTableRowDef } from './rows/defs/data-table-row-def.directive';

@NgModule({
  imports: [
    NovoDatePickerModule,
    CdkTableModule,
    CommonModule,
    FormsModule,
    NovoButtonModule,
    NovoDropdownModule,
    NovoFormExtrasModule,
    NovoLoadingModule,
    NovoTilesModule,
    NovoSearchBoxModule,
    NovoCommonModule,
    NovoSelectModule,
  ],
  declarations: [
    DataTableInterpolatePipe,
    DateTableDateRendererPipe,
    DateTableCurrencyRendererPipe,
    DateTableDateTimeRendererPipe,
    DateTableNumberRendererPipe,
    DateTableTimeRendererPipe,
    NovoDataTableHeaderCellDef,
    NovoDataTableColumnDef,
    NovoDataTableCellDef,
    NovoDataTableHeaderRowDef,
    NovoDataTableRowDef,
    NovoDataTableCellHeader,
    NovoDataTableSortFilter,
    NovoDataTableActionCell,
    NovoDataTableEmptyHeaderCell,
    NovoDataTableHeaderCell,
    NovoDataTableCell,
    NovoDataTableHeaderRow,
    NovoDataTableRow,
    NovoDataTablePagination,
    NovoDataTableCheckboxCell,
    NovoDataTableCheckboxHeaderCell,
    NovoDataTableSelection,
    NovoDataTable,
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
  ],
})
export class NovoDataTableModule {}
