import { InjectionToken } from '@angular/core';

export interface RadioGroup<T = any> {
  value: T;
  disabled: boolean;
}

export type ComponentType<T> = new (...args: any[]) => T;

export const NOVO_RADIO_GROUP = new InjectionToken<ComponentType<RadioGroup>>('RadioGroupComponent');
