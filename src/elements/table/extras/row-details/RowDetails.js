import { Component, ElementRef, ComponentResolver, ViewContainerRef } from '@angular/core';

import { BaseRenderer } from './../base-renderer/BaseRenderer';

@Component({
    selector: 'novo-row-details',
    inputs: [
        'data',
        'renderer'
    ],
    template: '<span>{{value}}</span>'
})
export class RowDetails {
    constructor(element:ElementRef, componentResolver:ComponentResolver, view:ViewContainerRef) {
        this.element = element;
        this.componentResolver = componentResolver;
        this.view = view;
        this.value = '';
    }

    ngOnInit() {
        if (this.renderer) {
            if (this.renderer.prototype instanceof BaseRenderer) {
                this.componentResolver.resolveComponent(this.renderer)
                    .then(componentFactory => {
                        let componentRef = this.view.createComponent(componentFactory);
                        componentRef.instance.data = this.data;
                    });
            } else {
                this.value = this.renderer(this.data);
            }
        } else {
            // this.value = this.row[this.column.name];
        }
    }
}
