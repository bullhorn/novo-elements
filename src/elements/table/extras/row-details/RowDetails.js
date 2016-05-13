import { Component, ElementRef, DynamicComponentLoader, ViewContainerRef } from '@angular/core';

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
    constructor(element:ElementRef, loader:DynamicComponentLoader, view:ViewContainerRef) {
        this.element = element;
        this.loader = loader;
        this.view = view;
        this.value = '';
    }

    ngOnInit() {
        if (this.renderer) {
            if (this.renderer.prototype instanceof BaseRenderer) {
                this.loader.loadNextToLocation(this.renderer, this.view).then(row => {
                    row.instance.data = this.data;
                });
            } else {
                this.value = this.renderer(this.data);
            }
        } else {
            // this.value = this.row[this.column.name];
        }
    }
}
