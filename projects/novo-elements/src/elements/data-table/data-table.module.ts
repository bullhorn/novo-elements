import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoButtonModule } from '../button/Button.module';
import { NovoCheckboxModule } from '../checkbox';
import { NovoCommonModule } from '../common/common.module';
import { NovoOptionModule } from '../common/option';
import { NovoDatePickerModule } from '../date-picker/DatePicker.module';
import { NovoDropdownModule } from '../dropdown/Dropdown.module';
import { NovoFieldModule } from '../field/field.module';
import { NovoFlexModule } from '../flex/Flex.module';
import { NovoFormExtrasModule } from '../form/extras/FormExtras.module';
import { NovoIconModule } from '../icon/Icon.module';
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoSearchBoxModule } from '../search/SearchBox.module';
import { NovoSelectModule } from '../select/Select.module';
import { NovoTilesModule } from '../tiles/Tiles.module';
import { NovoTooltipModule } from '../tooltip/Tooltip.module';
import { NovoDataTableCheckboxHeaderCell } from './cell-headers/data-table-checkbox-header-cell.component';
import { NovoDataTableExpandHeaderCell } from './cell-headers/data-table-expand-header-cell.component';
import { NovoDataTableCellHeader } from './cell-headers/data-table-header-cell.component';
import { NovoDataTableHeaderCell } from './cell-headers/data-table-header-cell.directive';
import { NovoDataTableCell } from './cells/data-table-cell.component';
import { NovoDataTableCheckboxCell } from './cells/data-table-checkbox-cell.component';
import { NovoDataTableExpandCell } from './cells/data-table-expand-cell.component';
import { NovoDataTableClearButton } from './data-table-clear-button.component';
import { NovoDataTableExpandDirective } from './data-table-expand.directive';
import { NovoDataTable } from './data-table.component';
import {
  DataTableBigDecimalRendererPipe,
  DataTableInterpolatePipe,
  DateTableCurrencyRendererPipe,
  DateTableDateRendererPipe,
  DateTableDateTimeRendererPipe,
  DateTableNumberRendererPipe,
  DateTableTimeRendererPipe,
} from './data-table.pipes';
import { NovoDataTablePagination } from './pagination/data-table-pagination.component';
import { NovoDataTableHeaderRow } from './rows/data-table-header-row.component';
import { NovoDataTableRow } from './rows/data-table-row.component';
import { NovoDataTableSortButton } from './sort-filter/sort-button.component';
import { NovoDataTableSortFilter } from './sort-filter/sort-filter.directive';
import { DataTableState } from './state/data-table-state.service';

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
