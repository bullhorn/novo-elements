// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// APP
import { NovoSelectModule } from '../../select/Select.module';
import { NovoDropdownModule } from '../../dropdown/Dropdown.module';
import { NovoButtonModule } from '../../button/Button.module';
import { Pagination } from './pagination/Pagination';
import { RowDetails } from './row-details/RowDetails';
import { TableCell } from './table-cell/TableCell';
import { TableFilter } from './table-filter/TableFilter';
import { ThOrderable } from './th-orderable/ThOrderable';
import { ThSortable } from './th-sortable/ThSortable';
import { DateCell } from './date-cell/DateCell';
import { PercentageCell } from './percentage-cell/PercentageCell';
import { NovoDropdownCell } from './dropdown-cell/DropdownCell';
import { NovoTableKeepFilterFocus } from './keep-filter-focus/KeepFilterFocus';
import { NovoTableActionsElement } from './table-actions/TableActions';
import { NovoTableFooterElement } from './table-footer/TableFooter';
import { NovoTableHeaderElement } from './table-header/TableHeader';

@NgModule({
  imports: [CommonModule, FormsModule, NovoSelectModule, NovoDropdownModule, NovoButtonModule],
  declarations: [
    NovoTableHeaderElement,
    NovoTableFooterElement,
    NovoTableActionsElement,
    NovoTableKeepFilterFocus,
    Pagination,
    RowDetails,
    TableCell,
    TableFilter,
    ThOrderable,
    ThSortable,
    DateCell,
    PercentageCell,
    NovoDropdownCell,
  ],
  exports: [
    NovoTableHeaderElement,
    NovoTableFooterElement,
    NovoTableActionsElement,
    NovoTableKeepFilterFocus,
    Pagination,
    RowDetails,
    TableCell,
    TableFilter,
    ThOrderable,
    ThSortable,
    DateCell,
    PercentageCell,
    NovoDropdownCell,
  ],
  entryComponents: [DateCell, PercentageCell, NovoDropdownCell],
})
export class NovoTableExtrasModule {}
