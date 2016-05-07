import {
    Component,
    ElementRef,
    DynamicComponentLoader,
    ViewContainerRef
} from '@angular/core';

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
    constructor(element:ElementRef, loader:DynamicComponentLoader, view:ViewContainerRef) {
        this.element = element;
        this.loader = loader;
        this.view = view;
        this.value = '';
    }

    ngOnInit() {
        if (!this.column.renderer || !(this.column.renderer.prototype instanceof BaseRenderer)) {
            this.value = this.row[this.column.name];
        } else if (this.column.renderer && this.column.renderer.prototype instanceof BaseRenderer) {
            this.column.type = 'customrenderer';
            this.loader.loadNextToLocation(this.column.renderer, this.view).then(cell => {
                cell.instance.meta = this.column;
                cell.instance.data = this.row;
                cell.instance.value = this.row[this.column.name];
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
