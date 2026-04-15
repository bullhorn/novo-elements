// NG2
import { ComponentRef, Injectable, Injector, StaticProvider, Type, ViewContainerRef } from '@angular/core';

@Injectable()
export class ComponentUtils<T = any> {

  append<T>(ComponentClass: Type<T>, location: ViewContainerRef, providers?: StaticProvider[], onTop?: boolean): ComponentRef<T> { //eslint-disable-line
    const parent = location.injector;
    const index = onTop ? 0 : location.length;
    const injector = Injector.create({ providers, parent });
    return location.createComponent(ComponentClass, {
      index,
      injector,
    });
  }
}
