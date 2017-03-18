// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// APP
import { NovoSelectModule } from '../../select/Select.module';
import { Pagination } from './pagination/Pagination';
import { RowDetails } from './row-details/RowDetails';
import { TableCell } from './table-cell/TableCell';
import { TableFilter } from './table-filter/TableFilter';
import { ThOrderable } from './th-orderable/ThOrderable';
import { ThSortable } from './th-sortable/ThSortable';
import { DateCell } from './date-cell/DateCell';
import { NovoTableKeepFilterFocus } from './keep-filter-focus/KeepFilterFocus';
import { NovoTableActionsElement } from './table-actions/TableActions';
import { NovoTableFooterElement } from './table-footer/TableFooter';
import { NovoTableHeaderElement } from './table-header/TableHeader';

@NgModule({
    imports: [CommonModule, FormsModule, NovoSelectModule],
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
        DateCell
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
        DateCell
    ],
    entryComponents: [DateCell]
})
export class NovoTableExtrasModule {
}
