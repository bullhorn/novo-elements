// NG2
import { Component, ElementRef, ComponentResolver, ViewChild, ViewContainerRef } from '@angular/core';
// APP
import { BaseRenderer } from './../base-renderer/BaseRenderer';

@Component({
    selector: 'novo-table-cell',
    inputs: ['column', 'row'],
    template: `
        <div [ngSwitch]="column._type">
            <ref *ngSwitchWhen="'custom'" #container></ref>
            <date-cell *ngSwitchWhen="'date'" [value]="value"></date-cell>
            <a *ngSwitchWhen="'link'" (click)="onClick($event);">{{ value }}</a>
            <span *ngSwitchDefault>{{ value }}</span>
        </div>
    `
})
export class TableCell {
    @ViewChild('container', { read: ViewContainerRef }) container:ViewContainerRef;

    constructor(element:ElementRef, componentResolver:ComponentResolver) {
        this.element = element;
        this.componentResolver = componentResolver;
        this.value = '';
    }

    ngOnInit() {
        this.column._type = this.column.type || 'text';
        if (this.column.renderer) {
            if (this.column.renderer.prototype instanceof BaseRenderer) {
                this.column._type = 'custom';
                this.componentResolver.resolveComponent(this.column.renderer)
                    .then(componentFactory => {
                        let componentRef = this.container.createComponent(componentFactory);
                        componentRef.instance.meta = this.column;
                        componentRef.instance.data = this.row;
                        componentRef.instance.value = this.row[this.column.name];
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
