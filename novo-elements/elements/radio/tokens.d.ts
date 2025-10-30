import { InjectionToken } from '@angular/core';
export interface RadioGroup<T = any> {
    name: string;
    value: T;
    disabled: boolean;
    appearance: 'vertical' | 'horizontal';
}
export type ComponentType<T> = new (...args: any[]) => T;
export declare const NOVO_RADIO_GROUP: InjectionToken<ComponentType<RadioGroup<any>>>;
