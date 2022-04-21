// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoButtonModule } from '../../button/Button.module';
import { NovoCommonModule } from '../../common/common.module';
import { NovoDropdownModule } from '../../dropdown/Dropdown.module';
// APP
import { NovoSelectModule } from '../../select/Select.module';
import { DateCell } from './date-cell/DateCell';
import { NovoDropdownCell } from './dropdown-cell/DropdownCell';
import { NovoTableKeepFilterFocus } from './keep-filter-focus/KeepFilterFocus';
import { Pagination } from './pagination/Pagination';
import { PercentageCell } from './percentage-cell/PercentageCell';
import { RowDetails } from './row-details/RowDetails';
import { NovoTableActionsElement } from './table-actions/TableActions';
import { TableCell } from './table-cell/TableCell';
import { TableFilter } from './table-filter/TableFilter';
import { NovoTableFooterElement } from './table-footer/TableFooter';
import { NovoTableHeaderElement } from './table-header/TableHeader';
import { ThOrderable } from './th-orderable/ThOrderable';
import { ThSortable } from './th-sortable/ThSortable';

@NgModule({
  imports: [CommonModule, FormsModule, NovoSelectModule, NovoDropdownModule, NovoButtonModule, NovoCommonModule],
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
})
export class NovoTableExtrasModule {}
