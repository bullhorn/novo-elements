import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoButtonModule } from '../button/Button.module';
import { NovoCheckboxModule } from '../checkbox';
import { NovoCommonModule, NovoOptionModule } from '../common';
import { NovoDatePickerModule } from '../date-picker/DatePicker.module';
import { NovoDropdownModule } from '../dropdown/Dropdown.module';
import { NovoFormExtrasModule } from '../form/extras/FormExtras.module';
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoSearchBoxModule } from '../search/SearchBox.module';
import { NovoTilesModule } from '../tiles/Tiles.module';
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
