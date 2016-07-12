import { Pagination } from './pagination/Pagination';
import { RowDetails } from './row-details/RowDetails';
import { TableCell } from './table-cell/TableCell';
import { TableFilter } from './table-filter/TableFilter';
import { ThOrderable } from './th-orderable/ThOrderable';
import { ThSortable } from './th-sortable/ThSortable';
import { DateCell } from './date-cell/DateCell';

export { BaseRenderer } from './base-renderer/BaseRenderer';
export const NOVO_TABLE_EXTRA_ELEMENTS = [Pagination, RowDetails, TableCell, TableFilter, ThOrderable, ThSortable, DateCell];
