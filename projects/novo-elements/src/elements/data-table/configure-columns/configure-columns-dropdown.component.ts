import { 
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

@Component({
    selector: 'configure-columns-dropdown',
    templateUrl: './configure-columns-dropdown.html',
})
export class ConfigureColumnsDropdown implements OnInit {
    @Input() columns: any;

    public displayedColumns;

    @Output() applyColumnConfig: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private ref: ChangeDetectorRef) {}

    ngOnInit() {
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
    }
}
