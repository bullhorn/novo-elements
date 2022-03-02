import { EventEmitter, InjectionToken } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export const NOVO_INPUT_FORMAT = new InjectionToken<NovoInputFormat>('NovoInputFormat');

export interface NovoInputFormat<T = any> extends ControlValueAccessor {
  valueChange: EventEmitter<any>;
  formatValue(value: T): string;
}
