import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoCommonModule, NovoOptionModule } from 'novo-elements/common';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoCheckboxModule } from 'novo-elements/components/checkbox';
import { NovoDatePickerModule } from 'novo-elements/components/date-picker';
import { NovoDropdownModule } from 'novo-elements/components/dropdown';
import { NovoFormExtrasModule } from 'novo-elements/components/form/extras';
import { NovoLoadingModule } from 'novo-elements/components/loading';
import { NovoSearchBoxModule } from 'novo-elements/components/search';
import { NovoTilesModule } from 'novo-elements/components/tiles';
import {
  NovoActionCell,
  NovoCell,
  NovoCellDef,
  NovoCheckboxCell,
  NovoCheckboxHeaderCell,
  NovoColumnDef,
  NovoEmptyHeaderCell,
  NovoHeaderCell,
  NovoHeaderCellDef,
} from './cell';
import { NovoAdvancedHeaderCell, NovoFilterFocus } from './cell-header';
import { NovoTablePagination } from './pagination';
import { NovoHeaderRow, NovoHeaderRowDef, NovoRow, NovoRowDef } from './row';
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
    NovoCellDef,
    NovoHeaderCellDef,
    NovoColumnDef,
    NovoActivityTableEmptyMessage,
    NovoActivityTableNoResultsMessage,
    NovoHeaderRowDef,
    NovoRowDef,
    NovoAdvancedHeaderCell,
    NovoSortFilter,
    NovoActionCell,
    NovoEmptyHeaderCell,
    NovoHeaderCell,
    NovoCell,
    NovoHeaderRow,
    NovoRow,
    NovoFilterFocus,
    NovoTablePagination,
    NovoActivityTableCustomHeader,
    NovoCheckboxCell,
    NovoCheckboxHeaderCell,
    NovoSelection,
    NovoActivityTable,
    NovoActivityTableActions,
    NovoActivityTableCustomFilter,
  ],
  declarations: [
    NovoTable,
    NovoCellDef,
    NovoHeaderCellDef,
    NovoColumnDef,
    NovoActivityTableEmptyMessage,
    NovoActivityTableNoResultsMessage,
    NovoHeaderRowDef,
    NovoRowDef,
    NovoAdvancedHeaderCell,
    NovoSortFilter,
    NovoActionCell,
    NovoEmptyHeaderCell,
    NovoHeaderCell,
    NovoCell,
    NovoHeaderRow,
    NovoRow,
    NovoFilterFocus,
    NovoTablePagination,
    NovoActivityTableCustomHeader,
    NovoCheckboxCell,
    NovoCheckboxHeaderCell,
    NovoSelection,
    NovoActivityTable,
    NovoActivityTableActions,
    NovoActivityTableCustomFilter,
  ],
  providers: [NovoActivityTableState],
})
export class NovoTableModule {}
