import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { NovoTable, NovoActivityTable, NovoActivityTableHeader, NovoActivityTableFooter } from './table';
import { NovoCell, NovoCheckboxCell, NovoCheckboxHeaderCell, NovoHeaderCell, NovoCellDef, NovoHeaderCellDef, NovoColumnDef, NovoButtonCell, NovoEmptyHeaderCell } from './cell';
import { NovoHeaderRow, NovoRow, NovoHeaderRowDef, NovoRowDef } from './row';
import { NovoSortHeader, NovoFilterFocus } from './sort-header';
import { NovoSortFilter, NovoSelection } from './sort';
import { NovoButtonModule } from '../button/Button.module';
import { NovoDropdownModule } from '../dropdown/Dropdown.module';
import { NovoFormExtrasModule } from '../form/extras/FormExtras.module';
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoTilesModule } from '../tiles/Tiles.module';
import { SimpleTablePagination } from './pagination';

export * from './cell';
export * from './table';
export * from './row';
export * from './sort-header';
export * from './sort';
export * from './interfaces';
export * from './table-source';

@NgModule({
    imports: [CdkTableModule, CommonModule, FormsModule, NovoButtonModule, NovoDropdownModule, NovoFormExtrasModule, NovoLoadingModule, NovoTilesModule],
    exports: [
        NovoTable, NovoCellDef, NovoHeaderCellDef, NovoColumnDef,
        NovoHeaderRowDef, NovoRowDef, NovoSortHeader, NovoSortFilter, NovoButtonCell, NovoEmptyHeaderCell,
        NovoHeaderCell, NovoCell, NovoHeaderRow, NovoRow, NovoFilterFocus, SimpleTablePagination,
        NovoCheckboxCell, NovoCheckboxHeaderCell, NovoSelection, NovoActivityTable, NovoActivityTableHeader, NovoActivityTableFooter
    ],
    declarations: [
        NovoTable, NovoCellDef, NovoHeaderCellDef, NovoColumnDef,
        NovoHeaderRowDef, NovoRowDef, NovoSortHeader, NovoSortFilter, NovoButtonCell, NovoEmptyHeaderCell,
        NovoHeaderCell, NovoCell, NovoHeaderRow, NovoRow, NovoFilterFocus, SimpleTablePagination,
        NovoCheckboxCell, NovoCheckboxHeaderCell, NovoSelection, NovoActivityTable, NovoActivityTableHeader, NovoActivityTableFooter
    ],
})
export class NovoSimpleTableModule { }
