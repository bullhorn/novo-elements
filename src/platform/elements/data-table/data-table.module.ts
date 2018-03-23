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
import { NovoDataTableValue } from './data-table-value.component';
import {
  NovoDataTableCell,
  NovoDataTableCheckboxCell,
  NovoDataTableCellDef,
  NovoIDataTableColumnDef,
  NovoDataTableActionCell,
} from './cells';
import { NovoDataTableHeaderRow, NovoDataTableRow, NovoDataTableHeaderRowDef, NovoDataTableRowDef } from './rows';
import {
  NovoDataTableCellHeader,
  NovoDataTableCheckboxHeaderCell,
  NovoDataTableHeaderCellDef,
  NovoDataTableEmptyHeaderCell,
  NovoDataTableHeaderCell,
} from './cell-headers';
import { NovoDataTableSortFilter } from './sort-filter';
import { NovoDataTableSelection } from './selection';
import { NovoDataTablePagination } from './pagination';
import { DataTableState } from './state';

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
  exports: [
    NovoDataTableCellDef,
    NovoDataTableHeaderCellDef,
    NovoIDataTableColumnDef,
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
  declarations: [
    NovoDataTableCellDef,
    NovoDataTableHeaderCellDef,
    NovoIDataTableColumnDef,
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
    NovoDataTableValue,
  ],
  providers: [DataTableState],
})
export class NovoDataTableModule {}
