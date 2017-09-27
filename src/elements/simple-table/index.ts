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
    NovoTable, NovoActivityTable, NovoActivityTableActions,
    NovoActivityTableEmptyMessage, NovoActivityTableNoResultsMessage
} from './table';
import {
    NovoSimpleCell, NovoSimpleCheckboxCell, NovoSimpleCheckboxHeaderCell, NovoSimpleHeaderCell,
    NovoSimpleCellDef, NovoSimpleHeaderCellDef, NovoSimpleColumnDef, NovoSimpleActionCell, NovoSimpleEmptyHeaderCell
} from './cell';
import { NovoSimpleHeaderRow, NovoSimpleRow, NovoSimpleHeaderRowDef, NovoSimpleRowDef } from './row';
import { NovoSimpleCellHeader, NovoSimpleFilterFocus } from './cell-header';
import { NovoSortFilter, NovoSelection } from './sort';

import { NovoSimpleTablePagination } from './pagination';

export * from './cell';
export * from './table';
export * from './row';
export * from './cell-header';
export * from './sort';
export * from './interfaces';
export * from './table-source';
export * from './activity-table-renderers';

@NgModule({
    imports: [
        NovoDatePickerModule, CdkTableModule, CommonModule, FormsModule, NovoButtonModule,
        NovoDropdownModule, NovoFormExtrasModule, NovoLoadingModule, NovoTilesModule, NovoSearchBoxModule
    ],
    exports: [
        NovoTable, NovoSimpleCellDef, NovoSimpleHeaderCellDef, NovoSimpleColumnDef, NovoActivityTableEmptyMessage, NovoActivityTableNoResultsMessage,
        NovoSimpleHeaderRowDef, NovoSimpleRowDef, NovoSimpleCellHeader, NovoSortFilter, NovoSimpleActionCell, NovoSimpleEmptyHeaderCell,
        NovoSimpleHeaderCell, NovoSimpleCell, NovoSimpleHeaderRow, NovoSimpleRow, NovoSimpleFilterFocus, NovoSimpleTablePagination,
        NovoSimpleCheckboxCell, NovoSimpleCheckboxHeaderCell, NovoSelection, NovoActivityTable, NovoActivityTableActions
    ],
    declarations: [
        NovoTable, NovoSimpleCellDef, NovoSimpleHeaderCellDef, NovoSimpleColumnDef, NovoActivityTableEmptyMessage, NovoActivityTableNoResultsMessage,
        NovoSimpleHeaderRowDef, NovoSimpleRowDef, NovoSimpleCellHeader, NovoSortFilter, NovoSimpleActionCell, NovoSimpleEmptyHeaderCell,
        NovoSimpleHeaderCell, NovoSimpleCell, NovoSimpleHeaderRow, NovoSimpleRow, NovoSimpleFilterFocus, NovoSimpleTablePagination,
        NovoSimpleCheckboxCell, NovoSimpleCheckboxHeaderCell, NovoSelection, NovoActivityTable, NovoActivityTableActions
    ],
})
export class NovoSimpleTableModule { }
