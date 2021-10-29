import { Pipe, PipeTransform } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
import { IDataTableColumn } from './interfaces';

export function interpolateCell<T>(value: any, col: IDataTableColumn<T>): string {
  if (col.format) {
    return Helpers.interpolateWithFallback(col.format, value);
  }
  return value;
}

@Pipe({
  name: 'dataTableInterpolate',
  pure: true,
})
export class DataTableInterpolatePipe<T> implements PipeTransform {
  transform(value: any, column: IDataTableColumn<T>): string {
    if (!Helpers.isEmpty(value)) {
      return interpolateCell<T>(value, column);
    }
    return '';
  }
}

@Pipe({
  name: 'dataTableDateRenderer',
  pure: true,
})
export class DateTableDateRendererPipe<T> implements PipeTransform {
  constructor(private labels: NovoLabelService) {}
  transform(value: any, column: IDataTableColumn<T>): string {
    if (!Helpers.isEmpty(value)) {
      return column.format ? value : this.labels.formatDate(interpolateCell<T>(value, column));
    }
    return '';
  }
}

@Pipe({
  name: 'dataTableDateTimeRenderer',
  pure: true,
})
export class DateTableDateTimeRendererPipe<T> implements PipeTransform {
  constructor(private labels: NovoLabelService) {}
  transform(value: any, column: IDataTableColumn<T>): string {
    if (!Helpers.isEmpty(value)) {
      return column.format ? value : this.labels.formatDateShort(interpolateCell<T>(value, column));
    }
    return '';
  }
}

@Pipe({
  name: 'dataTableTimeRenderer',
  pure: true,
})
export class DateTableTimeRendererPipe<T> implements PipeTransform {
  constructor(private labels: NovoLabelService) {}
  transform(value: any, column: IDataTableColumn<T>): string {
    if (!Helpers.isEmpty(value)) {
      return column.format ? value : this.labels.formatTime(interpolateCell<T>(value, column));
    }
    return '';
  }
}

@Pipe({
  name: 'dataTableNumberRenderer',
  pure: true,
})
export class DateTableNumberRendererPipe<T> implements PipeTransform {
  constructor(private labels: NovoLabelService) {}
  transform(value: any, column: IDataTableColumn<T>, isPercent: boolean = false): string {
    if (!Helpers.isEmpty(value)) {
      let val = interpolateCell<T>(value, column);
      if (isPercent && Helpers.isNumber(val)) {
        val = `${Number(val) * 100}`;
      }
      return `${this.labels.formatNumber(val)}${isPercent ? '%' : ''}`;
    }
    return '';
  }
}

@Pipe({
  name: 'dataTableBigDecimalRenderer',
  pure: true,
})
export class DataTableBigDecimalRendererPipe<T> implements PipeTransform {
  constructor(private labels: NovoLabelService) {}
  transform(value: any, column: IDataTableColumn<T>): string {
    if (!Helpers.isEmpty(value)) {
      const val = interpolateCell<T>(value, column);
      return this.labels.formatBigDecimal(Number(val), column.configuration);
    }
    return '';
  }
}

@Pipe({
  name: 'dataTableCurrencyRenderer',
  pure: true,
})
export class DateTableCurrencyRendererPipe<T> implements PipeTransform {
  constructor(private labels: NovoLabelService) {}
  transform(value: any, column: IDataTableColumn<T>): string {
    if (!Helpers.isEmpty(value)) {
      const val = interpolateCell<T>(value, column);
      return this.labels.formatCurrency(Number(val));
    }
    return '';
  }
}
