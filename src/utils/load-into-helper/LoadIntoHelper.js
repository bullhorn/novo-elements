import { Directive, AfterViewInit, OnDestroy, ComponentResolver, ViewContainerRef } from '@angular/core';

@Directive({
    inputs: ['component'],
    selector: 'load-into-helper'
})
export class LoadIntoHelper implements AfterViewInit, OnDestroy {
    constructor(componentResolver:ComponentResolver, view:ViewContainerRef) {
        this.componentResolver = componentResolver;
        this.view = view;
    }

    ngAfterViewInit() {
        this.componentResolver.resolveComponent(this.component)
            .then(componentFactory => {
                this.componentRef = this.view.createComponent(componentFactory);
            });
    }

    ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }
}
