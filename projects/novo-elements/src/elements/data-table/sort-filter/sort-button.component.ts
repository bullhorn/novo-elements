import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { NovoLabelService } from '../../../services/novo-label-service';
import { DataTableState } from '../state/data-table-state.service';
import { sortAscAnim, sortDescAnim, sortNoneAnim } from './sort-button.animations';
import { SortDirection } from './sort-direction';
@Component({
  selector: 'novo-sort-button',
  styleUrls: ['./sort-button.component.scss'],
  templateUrl: './sort-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [sortAscAnim, sortDescAnim, sortNoneAnim],
})
export class NovoDataTableSortButton<T> {
  @Output() sortChange: EventEmitter<SortDirection> = new EventEmitter();
  public SortDirection = SortDirection;

  @Input()
  public get value(): SortDirection {
    return this._value;
  }
  public set value(value: SortDirection) {
    this._value = value;
  }

  public get isActive() {
    return this.value !== SortDirection.NONE;
  }

  private _value: SortDirection = SortDirection.NONE;

  constructor(public state: DataTableState<T>, private ref: ChangeDetectorRef, public labels: NovoLabelService) {}

  changeSort(dir: SortDirection): void {
    this.value = dir;
    this.sortChange.emit(dir);
  }

  clearSort(): void {
    this.state.clearSort();
    this.sortChange.emit(SortDirection.NONE);
  }
}
