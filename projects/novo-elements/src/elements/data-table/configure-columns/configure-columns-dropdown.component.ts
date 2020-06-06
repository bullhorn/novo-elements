// NG2
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
// APP
import { BasePickerResults } from '../../picker/extras/base-picker-results/BasePickerResults';

@Component({
    selector: 'configure-columns-dropdown',
    templateUrl: './configure-columns-dropdown.html',
})
export class ConfigureColumnsDropdown extends BasePickerResults implements OnChanges {
    @Input() columns: any;

    public displayedColumns;

    @Output() applyColumnConfig: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        element: ElementRef,
        ref: ChangeDetectorRef,
    ) {
        super(element, ref);
    }

    ngOnChanges() {
        this.matches = this.columns;
    }

    saveColumns(emit = true): void {
        if (this.columns) {
            const enabledColumns = this.columns.filter((column: any) => column.enabled);
            this.displayedColumns = [...enabledColumns.map((column: any) => column.id)];
            this.ref.markForCheck();
            if (emit) {
                this.applyColumnConfig.emit(this.displayedColumns);
            }
        }
        this.clearQuickSearch();
    }

    clearQuickSearch(): void {
        this.term = '';
    }

    processSearch(): void {
        this.matches = this.columns.filter((column) => column.label.toLowerCase().includes(this.term.toLowerCase()));
        this.ref.markForCheck();
    }
}
