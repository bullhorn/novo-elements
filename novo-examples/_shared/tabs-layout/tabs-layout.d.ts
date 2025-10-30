import { AfterViewInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as i0 from "@angular/core";
export declare class TabsLayout implements AfterViewInit {
    private route;
    protected resolver: ComponentFactoryResolver;
    title: string;
    pages: any[];
    viewContainerRef: ViewContainerRef;
    private componentToCreate;
    constructor(route: ActivatedRoute, resolver: ComponentFactoryResolver);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabsLayout, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabsLayout, "tabs-layout", never, {}, {}, never, never, false, never>;
}
