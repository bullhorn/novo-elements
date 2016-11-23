// NG2
import { Component, ViewContainerRef, ViewChild } from '@angular/core';
// APP
import { Deferred } from './../../utils/deferred/Deferred';
import { ComponentUtils } from './../../utils/component-utils/ComponentUtils';

/**
 * Params that can be passed to the Modal
 */
export class NovoModalParams {
}

/**
 * Reference to an opened dialog.
 */
export class NovoModalRef {
    constructor() {
        this.contentRef = null;
        this.containerRef = null;
        this.isClosed = false;
        this._onClosed = new Deferred();
    }

    // Gets a promise that is resolved when the dialog is closed.
    get onClosed() {
        return this._onClosed;
    }

    open() {
        document.body.classList.add('modal-open');
    }

    close(result) {
        document.body.classList.remove('modal-open');

        if (this.contentRef) {
            this.contentRef.destroy();
        }

        if (this.containerRef) {
            this.containerRef.destroy();
        }

        this._onClosed.resolve(result);
    }
}

@Component({
    selector: 'novo-modal-container',
    template: '<span #container></span>'
})
export class NovoModalContainerElement {
    @ViewChild('container', { read: ViewContainerRef }) container:ViewContainerRef;

    constructor(modalRef:NovoModalRef, componentUtils:ComponentUtils) {
        this.modalRef = modalRef;
        this.componentUtils = componentUtils;
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.modalRef.contentRef = this.componentUtils.appendNextToLocation(this.modalRef.component, this.container);
        });
    }
}

@Component({
    selector: 'novo-modal',
    template: `
        <ng-content select="header"></ng-content>
        <ng-content select="section"></ng-content>
        <footer>
            <ng-content select="button"></ng-content>
        </footer>
    `
})
export class NovoModalElement {
    constructor(modalRef:NovoModalRef) {
        this.modalRef = modalRef;
    }

    close() {
        this.modalRef.close();
    }
}

@Component({
    selector: 'novo-notification',
    inputs: ['type', 'icon'],
    template: `
        <button class="modal-close" theme="icon" icon="times" (click)="close()"></button>
        <header>
            <ng-content select="label"></ng-content>
        </header>
        <section class="notification-body">
            <i class="indicator" [ngClass]="iconType" *ngIf="iconType"></i>
            <ng-content select="h1"></ng-content>
            <ng-content select="h4"></ng-content>
            <ng-content select="p"></ng-content>
        </section>
        <footer>
            <ng-content select="button"></ng-content>
        </footer>
    `
})
export class NovoModalNotificationElement {
    constructor(modalRef:NovoModalRef) {
        this.modalRef = modalRef;
    }

    close() {
        this.modalRef.close();
    }

    ngOnInit() {
        switch (this.type) {
            case 'success':
                this.iconType = 'bhi-check';
                break;
            case 'warning':
                this.iconType = 'bhi-caution-o';
                break;
            case 'error':
                this.iconType = 'bhi-caution-o';
                break;
            case 'custom':
                this.iconType = `bhi-${this.icon}`;
                break;
            default:
                break;
        }
    }
}
