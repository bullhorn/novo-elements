// NG2
import { ComponentFactoryResolver, ComponentRef, Injectable, Injector, StaticProvider, Type, ViewContainerRef } from '@angular/core';

@Injectable()
export class ComponentUtils<T = any> {
  constructor(public componentFactoryResolver: ComponentFactoryResolver) {}

  append<T>(ComponentClass: Type<T>, location: ViewContainerRef, providers?: StaticProvider[], onTop?: boolean): ComponentRef<T> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ComponentClass);
    const parent = location.injector;
    const index = onTop ? 0 : location.length;
    return location.createComponent(componentFactory, index, Injector.create({ providers, parent }));
  }
}
