import { Component, ElementRef, DynamicComponentLoader } from 'angular2/core';

import { BaseRenderer } from './../base-renderer/BaseRenderer';

@Component({
    selector: 'novo-table-cell',
    inputs: [
        'column',
        'row'
    ],
    template: `
        <span #anchor></span>
        <span *ngIf="!column.type || column.type === 'text'">{{ value }}</span>
        <a (click)="onClick($event);" *ngIf="column.type === 'link'">{{ value }}</a>
    `
})
export class TableCell {
    constructor(element:ElementRef, loader:DynamicComponentLoader) {
        this.element = element;
        this.loader = loader;
        this.value = '';
    }

    ngOnInit() {
        if (this.column.renderer) {
            if (this.column.renderer.prototype instanceof BaseRenderer) {
                this.column.type = 'customrenderer';
                this.loader.loadIntoLocation(this.column.renderer, this.element, 'anchor').then(cell => {
                    cell.instance.meta = this.column;
                    cell.instance.data = this.row;
                    cell.instance.value = this.row[this.column.name];
                });
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
