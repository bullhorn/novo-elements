import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';

@Component({
    selector: 'novo-data-table-cell-filter-header',
    template: `
    <div class="header">
      <novo-label>{{ label || labels.filters }}</novo-label>
      <novo-button
        theme="dialogue"
        color="negative"
        size="small"
        icon="times"
        (click)="clearFilter.emit()"
        *ngIf="hasFilter"
        data-automation-id="novo-data-table-filter-clear">
        {{ labels.clear }}
      </novo-button>
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class NovoDataTableCellFilterHeader {
  @Input() label: string | number;

  @Input()
  set filter(filter: any) {
    this._filter = filter;
    this.hasFilter = !Helpers.isEmpty(filter);
  }
  get filter(): any {
    return this._filter;
  }
  private _filter: any;

  public hasFilter = false;

  @Output() clearFilter: EventEmitter<void> = new EventEmitter<void>();

  constructor(public changeDetectorRef: ChangeDetectorRef, public labels: NovoLabelService) {}
}
