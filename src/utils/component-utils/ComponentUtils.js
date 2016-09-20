// NG2
import {
    ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, ReflectiveInjector, ViewContainerRef,
    ResolvedReflectiveProvider, Type
} from '@angular/core';

@Injectable()
export class ComponentUtils {
    constructor(componentFactoryResolver:ComponentFactoryResolver, applicationRef:ApplicationRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.applicationRef = applicationRef;
    }

    getRootViewContainerRef():ViewContainerRef {
        const appInstance = this.applicationRef.components[0].instance;
        if (!appInstance.viewContainerRef) {
            const appName = this.applicationRef.componentTypes[0].name;
            throw new Error(`Missing 'viewContainerRef' declaration in ${appName} constructor`);
        }
        return appInstance.viewContainerRef;
    }

    appendNextToLocation<T>(ComponentClass:Type<T>, location:ViewContainerRef, providers?:ResolvedReflectiveProvider[]):ComponentRef<T> {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ComponentClass);
        let parentInjector = location.parentInjector;
        let childInjector:Injector = parentInjector;
        if (providers && providers.length > 0) {
            childInjector = ReflectiveInjector.fromResolvedProviders(providers, parentInjector);
        }
        return location.createComponent(componentFactory, location.length, childInjector);
    }

    appendNextToRoot<T>(ComponentClass:Type<T>, providers?:ResolvedReflectiveProvider[]):ComponentRef<T> {
        let location = this.getRootViewContainerRef();
        return this.appendNextToLocation(ComponentClass, location, providers);
    }
}
