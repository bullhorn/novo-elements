// NG2
import { Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
// APP
import { BaseRenderer } from './../base-renderer/BaseRenderer';
import { ComponentUtils } from './../../../../utils/component-utils/ComponentUtils';

@Component({
    selector: 'novo-table-cell',
    inputs: ['column', 'row'],
    template: `
        <div [ngSwitch]="column._type">
            <span #container></span>
            <date-cell *ngSwitchCase="'date'" [value]="value"></date-cell>
            <a *ngSwitchCase="'link'" (click)="onClick($event);">{{ value }}</a>
            <span *ngSwitchDefault>{{ value }}</span>
        </div>
    `
})
export class TableCell {
    @ViewChild('container', { read: ViewContainerRef }) container:ViewContainerRef;

    constructor(element:ElementRef, componentUtils:ComponentUtils) {
        this.element = element;
        this.componentUtils = componentUtils;
        this.value = '';
    }

    ngOnInit() {
        this.column._type = this.column.type || 'text';
        if (this.column.renderer) {
            if (this.column.renderer.prototype instanceof BaseRenderer) {
                this.column._type = 'custom';
                let componentRef = this.componentUtils.appendNextToLocation(this.column.renderer, this.container);
                componentRef.instance.meta = this.column;
                componentRef.instance.data = this.row;
                componentRef.instance.value = this.row[this.column.name];
            } else {
                this.value = this.column.renderer(this.row);
            }
        } else {
            this.value = this.row[this.column.name];
        }
    }

    onClick(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (this.column.onClick) {
            this.column.onClick(this.row);
        }
    }
}
