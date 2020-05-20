import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { IDataTableColumn } from 'novo-elements';

@Component({
    selector: 'configure-columns-dropdown',
    templateUrl: './configure-columns-dropdown.html',
})
export class ConfigureColumnsDropdown {
    @Input()
    public columns;

    @Input()
    public displayedColumns;

    constructor(private ref: ChangeDetectorRef) {}

    ngOnInit() {
        if (this.columns) {
            const enabledColumns = this.columns.filter((column: IDataTableColumn<any>) => column.enabled);
            this.displayedColumns = ['selection', 'expand', ...enabledColumns.map((column: IDataTableColumn<any>) => column.id)];
            this.ref.markForCheck();
        }
    }
}
