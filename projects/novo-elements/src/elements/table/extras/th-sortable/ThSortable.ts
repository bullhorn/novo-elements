// NG2
import { Directive, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: '[novoThSortable]',
  host: {
    '(click)': 'onToggleSort($event)',
  },
})
export class ThSortable {
  @Input('novoThSortable')
  config: any;
  @Input()
  column: any;
  @Output()
  onSortChange: EventEmitter<any> = new EventEmitter();

  onToggleSort(event) {
    if (event) {
      event.preventDefault();
    }

    if (this.config && this.column && this.config.sorting !== false && this.column.sorting !== false) {
      switch (this.column.sort) {
        case 'asc':
          this.column.sort = 'desc';
          break;
        default:
          this.column.sort = 'asc';
          break;
      }

      this.onSortChange.emit(this.column);
    }
  }
}
