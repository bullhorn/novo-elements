// NG2
import { Component, ElementRef, ViewContainerRef, ViewChild } from '@angular/core';
// APP
import { BaseRenderer } from './../base-renderer/BaseRenderer';
import { ComponentUtils } from './../../../../utils/component-utils/ComponentUtils';

@Component({
    selector: 'novo-row-details',
    inputs: ['data', 'renderer'],
    template: `
        <ref #container></ref>
        <span>{{value}}</span>
    `
})
export class RowDetails {
    @ViewChild('container', { read: ViewContainerRef }) container:ViewContainerRef;

    constructor(element:ElementRef, componentUtils:ComponentUtils) {
        this.element = element;
        this.componentUtils = componentUtils;
        this.value = '';
    }

    ngOnInit() {
        if (this.renderer) {
            if (this.renderer.prototype instanceof BaseRenderer) {
                let componentRef = this.componentUtils.appendNextToLocation(this.renderer, this.container);
                componentRef.instance.data = this.data;
            } else {
                this.value = this.renderer(this.data);
            }
        } else {
            // this.value = this.row[this.column.name];
        }
    }
}
