import { Component, ViewContainerRef, ComponentResolver, ViewChild } from '@angular/core';

import { NOVO_BUTTON_ELEMENTS } from './../button/Button';
import { Deferred } from './../../utils/deferred/Deferred';

export class ModalParams {
}

/**
 * Reference to an opened dialog.
 */
export class ModalRef {
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
    moduleId: module.id,
    selector: 'novo-modal-container',
    template: '<ref #container></ref>'
})
export class NovoModalContainer {
    @ViewChild('container', { read: ViewContainerRef }) container:ViewContainerRef;

    constructor(modalRef:ModalRef, componentResolver:ComponentResolver) {
        this.modalRef = modalRef;
        this.componentResolver = componentResolver;
    }

    ngAfterViewInit() {
        this.componentResolver.resolveComponent(this.modalRef.component)
            .then(componentFactory => {
                this.modalRef.contentRef = this.container.createComponent(componentFactory);
            });
    }
}

@Component({
    moduleId: module.id,
    selector: 'novo-modal',
    template: `
        <ng-content select="header"></ng-content>
        <ng-content select="section"></ng-content>
        <footer>
            <ng-content select="button"></ng-content>
        </footer>
    `
})
export class NovoModal {
    constructor(modalRef:ModalRef) {
        this.modalRef = modalRef;
    }

    close() {
        this.modalRef.close();
    }
}

@Component({
    moduleId: module.id,
    selector: 'novo-notification',
    inputs: ['type'],
    template: `
        <button class="modal-close" theme="icon" icon="times" (click)="close()"></button>
        <header>
            <ng-content select="label"></ng-content>
        </header>
        <section class="notification-body">
            <i class="indicator" [ngClass]="iconType"></i>
            <ng-content select="h1"></ng-content>
            <ng-content select="h4"></ng-content>
            <ng-content select="p"></ng-content>
        </section>
        <footer>
            <ng-content select="button"></ng-content>
        </footer>
    `,
    directives: [NOVO_BUTTON_ELEMENTS]
})
export class Notification {
    constructor(modalRef:ModalRef) {
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
            default:
                break;
        }
    }
}

export const NOVO_MODAL_ELEMENTS = [NovoModalContainer, NovoModal, Notification];
