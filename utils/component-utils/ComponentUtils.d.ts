import { ComponentFactoryResolver, ComponentRef, ViewContainerRef, ResolvedReflectiveProvider } from '@angular/core';
export declare class ComponentUtils {
    componentFactoryResolver: ComponentFactoryResolver;
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    appendNextToLocation(ComponentClass: any, location: ViewContainerRef, providers?: ResolvedReflectiveProvider[]): ComponentRef<any>;
}
