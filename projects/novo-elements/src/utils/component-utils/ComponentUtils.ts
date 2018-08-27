// NG2
import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  ReflectiveInjector,
  ViewContainerRef,
  ResolvedReflectiveProvider,
} from '@angular/core';

@Injectable()
export class ComponentUtils {
  componentFactoryResolver: ComponentFactoryResolver;

  constructor(componentFactoryResolver: ComponentFactoryResolver) {
    this.componentFactoryResolver = componentFactoryResolver;
  }

  appendNextToLocation(ComponentClass, location: ViewContainerRef, providers?: ResolvedReflectiveProvider[]): ComponentRef<any> {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ComponentClass);
    let parentInjector = location.parentInjector;
    let childInjector: Injector = parentInjector;
    if (providers && providers.length > 0) {
      childInjector = ReflectiveInjector.fromResolvedProviders(providers, parentInjector);
    }
    return location.createComponent(componentFactory, location.length, childInjector);
  }

  appendTopOfLocation(ComponentClass, location: ViewContainerRef, providers?: ResolvedReflectiveProvider[]): ComponentRef<any> {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ComponentClass);
    let parentInjector = location.parentInjector;
    let childInjector: Injector = parentInjector;
    if (providers && providers.length > 0) {
      childInjector = ReflectiveInjector.fromResolvedProviders(providers, parentInjector);
    }
    return location.createComponent(componentFactory, 0, childInjector);
  }
}
