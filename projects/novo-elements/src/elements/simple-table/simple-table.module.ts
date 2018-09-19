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

import {
  NovoTable,
  NovoActivityTable,
  NovoActivityTableActions,
  NovoActivityTableCustomFilter,
  NovoActivityTableEmptyMessage,
  NovoActivityTableNoResultsMessage,
  NovoActivityTableCustomHeader,
} from './table';
import {
  NovoSimpleCell,
  NovoSimpleCheckboxCell,
  NovoSimpleCheckboxHeaderCell,
  NovoSimpleHeaderCell,
  NovoSimpleCellDef,
  NovoSimpleHeaderCellDef,
  NovoSimpleColumnDef,
  NovoSimpleActionCell,
  NovoSimpleEmptyHeaderCell,
} from './cell';
import { NovoSimpleHeaderRow, NovoSimpleRow, NovoSimpleHeaderRowDef, NovoSimpleRowDef } from './row';
import { NovoSimpleCellHeader, NovoSimpleFilterFocus } from './cell-header';
import { NovoSortFilter, NovoSelection } from './sort';
import { NovoSimpleTablePagination } from './pagination';
import { NovoActivityTableState } from './state';

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
  ],
  exports: [
    NovoTable,
    NovoSimpleCellDef,
    NovoSimpleHeaderCellDef,
    NovoSimpleColumnDef,
    NovoActivityTableEmptyMessage,
    NovoActivityTableNoResultsMessage,
    NovoSimpleHeaderRowDef,
    NovoSimpleRowDef,
    NovoSimpleCellHeader,
    NovoSortFilter,
    NovoSimpleActionCell,
    NovoSimpleEmptyHeaderCell,
    NovoSimpleHeaderCell,
    NovoSimpleCell,
    NovoSimpleHeaderRow,
    NovoSimpleRow,
    NovoSimpleFilterFocus,
    NovoSimpleTablePagination,
    NovoActivityTableCustomHeader,
    NovoSimpleCheckboxCell,
    NovoSimpleCheckboxHeaderCell,
    NovoSelection,
    NovoActivityTable,
    NovoActivityTableActions,
    NovoActivityTableCustomFilter,
  ],
  declarations: [
    NovoTable,
    NovoSimpleCellDef,
    NovoSimpleHeaderCellDef,
    NovoSimpleColumnDef,
    NovoActivityTableEmptyMessage,
    NovoActivityTableNoResultsMessage,
    NovoSimpleHeaderRowDef,
    NovoSimpleRowDef,
    NovoSimpleCellHeader,
    NovoSortFilter,
    NovoSimpleActionCell,
    NovoSimpleEmptyHeaderCell,
    NovoSimpleHeaderCell,
    NovoSimpleCell,
    NovoSimpleHeaderRow,
    NovoSimpleRow,
    NovoSimpleFilterFocus,
    NovoSimpleTablePagination,
    NovoActivityTableCustomHeader,
    NovoSimpleCheckboxCell,
    NovoSimpleCheckboxHeaderCell,
    NovoSelection,
    NovoActivityTable,
    NovoActivityTableActions,
    NovoActivityTableCustomFilter,
  ],
  providers: [NovoActivityTableState],
})
export class NovoSimpleTableModule {}
