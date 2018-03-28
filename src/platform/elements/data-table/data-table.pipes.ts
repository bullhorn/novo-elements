import { Pipe, PipeTransform } from '@angular/core';

import { IDataTableColumn } from './interfaces';
import { NovoLabelService } from '../../services/novo-label-service';

export function interpolateCell<T>(value: any, col: IDataTableColumn<T>): string {
  if (col.property) {
    let keys = col.property.split('.');
    let currValue = value[keys.shift()];
    while (keys.length && value !== undefined) {
      let k = keys.shift();
      value = k ? value[k] : `${value}.`;
    }
    return currValue !== undefined ? currValue : col.property;
  }
  return value;
}

@Pipe({
  name: 'dataTableInterpolate',
  pure: true,
})
export class DataTableInterpolatePipe<T> implements PipeTransform {
  transform(value: any, column: IDataTableColumn<T>): string {
    return interpolateCell<T>(value, column);
  }
}

@Pipe({
  name: 'dataTableDateRenderer',
  pure: true,
})
export class DateTableDateRendererPipe<T> implements PipeTransform {
  constructor(private labels: NovoLabelService) {}
  transform(value: any, column: IDataTableColumn<T>): string {
    let val = interpolateCell<T>(value, column);
    return this.labels.formatDate(val);
  }
}

@Pipe({
  name: 'dataTableDateTimeRenderer',
  pure: true,
})
export class DateTableDateTimeRendererPipe<T> implements PipeTransform {
  constructor(private labels: NovoLabelService) {}
  transform(value: any, column: IDataTableColumn<T>): string {
    let val = interpolateCell<T>(value, column);
    return this.labels.formatDateShort(val);
  }
}

@Pipe({
  name: 'dataTableTimeRenderer',
  pure: true,
})
export class DateTableTimeRendererPipe<T> implements PipeTransform {
  constructor(private labels: NovoLabelService) {}
  transform(value: any, column: IDataTableColumn<T>): string {
    let val = interpolateCell<T>(value, column);
    return this.labels.formatTime(val);
  }
}

@Pipe({
  name: 'dataTableNumberRenderer',
  pure: true,
})
export class DateTableNumberRendererPipe<T> implements PipeTransform {
  constructor(private labels: NovoLabelService) {}
  transform(value: any, column: IDataTableColumn<T>): string {
    let val = interpolateCell<T>(value, column);
    return this.labels.formatNumber(val);
  }
}

@Pipe({
  name: 'dataTableCurrencyRenderer',
  pure: true,
})
export class DateTableCurrencyRendererPipe<T> implements PipeTransform {
  constructor(private labels: NovoLabelService) {}
  transform(value: any, column: IDataTableColumn<T>): string {
    let val = interpolateCell<T>(value, column);
    return this.labels.formatCurrency(Number(val));
  }
}
