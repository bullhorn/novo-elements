// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// APP
import { NovoSelectModule } from './../../../../novo-elements';
import { Pagination } from './pagination/Pagination';
import { RowDetails } from './row-details/RowDetails';
import { TableCell } from './table-cell/TableCell';
import { TableFilter } from './table-filter/TableFilter';
import { ThOrderable } from './th-orderable/ThOrderable';
import { ThSortable } from './th-sortable/ThSortable';
import { DateCell } from './date-cell/DateCell';

@NgModule({
    imports: [CommonModule, FormsModule, NovoSelectModule],
    declarations: [Pagination, RowDetails, TableCell, TableFilter, ThOrderable, ThSortable, DateCell],
    exports: [Pagination, RowDetails, TableCell, TableFilter, ThOrderable, ThSortable, DateCell],
    entryComponents: [DateCell]
})
export class NovoTableExtrasModule {
}
