import { ChangeDetectionStrategy, Component, OnInit, HostListener, HostBinding, Input } from '@angular/core';

import { NovoLabelService } from '../../services/novo-label-service';
import { IDataTableColumn, IDataTableCell } from './interfaces';
import { Helpers } from '../../utils/Helpers';

@Component({
  selector: 'novo-data-table-value',
  template: '{{ value }}',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoDataTableValue<T> implements OnInit, IDataTableCell<T> {
  @HostBinding('class.clickable') public isClickable: boolean = false;

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent) {
    if (this.isClickable) {
      if (this.column.handlers && this.column.handlers.click) {
        this.column.handlers.click({ originalEvent: event, row: this.row });
      }
      return;
    }
  }

  @Input() column: IDataTableColumn<T>;
  @Input() row: T;

  public value: string;

  constructor(private labels: NovoLabelService) {}

  public ngOnInit(): void {
    // Clickable?
    this.isClickable = this.column.type === 'link';
    // Configure the value
    let interpolatedValue: string = this.interpolateCell(this.row, this.column);
    switch (this.column.type) {
      case 'string':
        this.value = interpolatedValue;
        break;
      case 'date':
        this.value = this.labels.formatDate(interpolatedValue);
        break;
      case 'datetime':
        this.value = this.labels.formatDateShort(interpolatedValue);
        break;
      case 'time':
        this.value = this.labels.formatTime(interpolatedValue);
        break;
      case 'currency':
        this.value = this.labels.formatCurrency(Number(interpolatedValue));
        break;
      case 'number':
        this.value = this.labels.formatNumber(interpolatedValue);
        break;
      default:
        this.value = interpolatedValue;
        break;
    }
  }

  private interpolateCell(row: T, col: IDataTableColumn<T>): string {
    if (col.property) {
      let keys = col.property.split('.');
      let value = row[keys.shift()];
      while (keys.length && value !== undefined) {
        let k = keys.shift();
        value = k ? value[k] : `${value}.`;
      }
      return value !== undefined ? value : col.property;
    }
    return row[col.id];
  }
}
