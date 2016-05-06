import { Component, ElementRef, DynamicComponentLoader } from 'angular2/core';

import { BaseRenderer } from './../base-renderer/BaseRenderer';

@Component({
    selector: 'novo-row-details',
    inputs: [
        'data',
        'renderer'
    ],
    template: '<span #anchor>{{ value }}</span>'
})
export class RowDetails {
    constructor(element:ElementRef, loader:DynamicComponentLoader) {
        this.element = element;
        this.loader = loader;
        this.value = '';
    }

    ngOnInit() {
        if (this.renderer) {
            if (this.renderer.prototype instanceof BaseRenderer) {
                this.loader.loadIntoLocation(this.renderer, this.element, 'anchor').then(row => {
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
