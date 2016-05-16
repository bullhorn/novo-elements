import { Component, ElementRef, ComponentResolver, ViewContainerRef } from '@angular/core';

import { BaseRenderer } from './../base-renderer/BaseRenderer';

@Component({
    selector: 'novo-table-cell',
    inputs: [
        'column',
        'row'
    ],
    template: `
        <span *ngIf="!column.type || column.type === 'text'">{{ value }}</span>
        <a (click)="onClick($event);" *ngIf="column.type === 'link'">{{ value }}</a>
    `
})
export class TableCell {
    constructor(element:ElementRef, componentResolver:ComponentResolver, view:ViewContainerRef) {
        this.element = element;
        this.componentResolver = componentResolver;
        this.view = view;
        this.value = '';
    }

    ngOnInit() {
        if (!this.column.renderer || !(this.column.renderer.prototype instanceof BaseRenderer)) {
            this.value = this.row[this.column.name];
        } else if (this.column.renderer && this.column.renderer.prototype instanceof BaseRenderer) {
            this.column.type = 'customrenderer';
            this.componentResolver.resolveComponent(this.column.renderer)
                .then(componentFactory => {
                    let componentRef = this.view.createComponent(componentFactory);
                    componentRef.instance.meta = this.column;
                    componentRef.instance.data = this.row;
                    componentRef.instance.value = this.row[this.column.name];
                });
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
