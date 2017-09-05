import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { CdkTableModule } from '@angular/cdk/table';
import { NovoTable } from './table';
import { NovoCell, NovoCheckboxCell, NovoCheckboxHeaderCell, NovoHeaderCell, NovoCellDef, NovoHeaderCellDef, NovoColumnDef } from './cell';
import { NovoHeaderRow, NovoRow, NovoHeaderRowDef, NovoRowDef } from './row';
import { NovoSortHeader, NovoFilterFocus } from './sort-header';
import { NovoSortFilter, NovoSelection } from './sort';
import { NovoButtonModule } from "../button/Button.module";
import { NovoDropdownModule } from "../dropdown/Dropdown.module";
import { NovoFormExtrasModule } from "../form/extras/FormExtras.module";

export * from './cell';
export * from './table';
export * from './row';
export * from './sort-header';
export * from './sort';

@NgModule({
    imports: [CdkTableModule, CommonModule, FormsModule, NovoButtonModule, NovoDropdownModule, NovoFormExtrasModule],
    exports: [
        NovoTable, NovoCellDef, NovoHeaderCellDef, NovoColumnDef,
        NovoHeaderRowDef, NovoRowDef, NovoSortHeader, NovoSortFilter,
        NovoHeaderCell, NovoCell, NovoHeaderRow, NovoRow, NovoFilterFocus,
        NovoCheckboxCell, NovoCheckboxHeaderCell, NovoSelection
    ],
    declarations: [
        NovoTable, NovoCellDef, NovoHeaderCellDef, NovoColumnDef,
        NovoHeaderRowDef, NovoRowDef, NovoSortHeader, NovoSortFilter,
        NovoHeaderCell, NovoCell, NovoHeaderRow, NovoRow, NovoFilterFocus,
        NovoCheckboxCell, NovoCheckboxHeaderCell, NovoSelection
    ],
})
export class NovoSimpleTableModule { }
