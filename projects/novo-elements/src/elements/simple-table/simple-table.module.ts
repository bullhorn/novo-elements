import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoCheckboxModule } from 'novo-elements/elements/checkbox';
import { NovoCommonModule, NovoOptionModule } from 'novo-elements/elements/common';
import { NovoDatePickerModule } from 'novo-elements/elements/date-picker';
import { NovoDropdownModule } from 'novo-elements/elements/dropdown';
import { NovoFormExtrasModule } from 'novo-elements/elements/form';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import { NovoSearchBoxModule } from 'novo-elements/elements/search';
import { NovoSelectModule } from 'novo-elements/elements/select';
import { NovoTilesModule } from 'novo-elements/elements/tiles';
import {
  NovoSimpleActionCell,
  NovoSimpleCell,
  NovoSimpleCellDef,
  NovoSimpleCheckboxCell,
  NovoSimpleCheckboxHeaderCell,
  NovoSimpleColumnDef,
  NovoSimpleEmptyHeaderCell,
  NovoSimpleHeaderCell,
  NovoSimpleHeaderCellDef,
} from './cell';
import { NovoSimpleCellHeader, NovoSimpleFilterFocus } from './cell-header';
import { NovoSimpleTablePagination } from './pagination';
import { Pagination } from './PaginationOld';
import { NovoSimpleHeaderRow, NovoSimpleHeaderRowDef, NovoSimpleRow, NovoSimpleRowDef } from './row';
import { NovoSelection, NovoSortFilter } from './sort';
import { NovoActivityTableState } from './state';
import {
  NovoActivityTable,
  NovoActivityTableActions,
  NovoActivityTableCustomFilter,
  NovoActivityTableCustomHeader,
  NovoActivityTableEmptyMessage,
  NovoActivityTableNoResultsMessage,
  NovoTable,
} from './table';

@NgModule({
  imports: [
    NovoDatePickerModule,
    CdkTableModule,
    CommonModule,
    FormsModule,
    NovoCommonModule,
    NovoButtonModule,
    NovoDropdownModule,
    NovoFormExtrasModule,
    NovoLoadingModule,
    NovoTilesModule,
    NovoSearchBoxModule,
    NovoSelectModule,
    NovoCheckboxModule,
    NovoOptionModule,
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
    Pagination,
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
    Pagination,
  ],
  providers: [NovoActivityTableState],
})
export class NovoSimpleTableModule {}
