import { Component, ElementRef, ComponentResolver, ViewContainerRef, ViewChild } from '@angular/core';

import { BaseRenderer } from './../base-renderer/BaseRenderer';

@Component({
    selector: 'novo-row-details',
    inputs: [
        'data',
        'renderer'
    ],
    template: '<span #container>{{value}}</span>'
})
export class RowDetails {
    @ViewChild('container', { read: ViewContainerRef }) container:ViewContainerRef;

    constructor(element:ElementRef, componentResolver:ComponentResolver) {
        this.element = element;
        this.componentResolver = componentResolver;
        this.value = '';
    }

    ngOnInit() {
        if (this.renderer) {
            if (this.renderer.prototype instanceof BaseRenderer) {
                this.componentResolver.resolveComponent(this.renderer)
                    .then(componentFactory => {
                        let componentRef = this.container.createComponent(componentFactory);
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
