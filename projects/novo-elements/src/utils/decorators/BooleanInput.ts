import { coerceBooleanProperty } from '@angular/cdk/coercion';

export function BooleanInput(): any {
  return (target: any, propertyKey: string | symbol) => {
    const key = Symbol();
    return {
      get() {
        return this[key] || false;
      },
      set(value: boolean | string) {
        this[key] = coerceBooleanProperty(value);
      },
    };
  };
}
