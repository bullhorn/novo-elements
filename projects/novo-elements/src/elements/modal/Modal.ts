// NG2
import { Component, ViewContainerRef, ViewChild, AfterViewInit, Input, Output, EventEmitter, OnInit, Injectable } from '@angular/core';
// APP
import { Deferred } from './../../utils/deferred/Deferred';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';

/**
 * Params that can be passed to the Modal
 */

export interface ModalParams {
  [propName: string]: any;
}
export class NovoModalParams implements ModalParams {}

/**
 * Reference to an opened dialog.
 */
@Injectable()
export class NovoModalRef {
  component: any = null;
  contentRef: any = null;
  containerRef: any = null;
  isClosed: boolean = false;
  _onClosed: any = Deferred();

  // Gets a promise that is resolved when the dialog is closed.
  get onClosed() {
    return this._onClosed;
  }

  open() {
    document.body.classList.add('modal-open');
  }

  close(result?: any) {
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
  template: '<span #container></span>',
})
export class NovoModalContainerElement implements AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  constructor(private modalRef: NovoModalRef, private componentUtils: ComponentUtils) {}

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
    `,
})
export class NovoModalElement {
  constructor(private modalRef: NovoModalRef) {}

  close() {
    this.modalRef.close();
  }
}

@Component({
  selector: 'novo-notification',
  template: `
        <button class="modal-close" theme="icon" icon="times" (click)="close()"></button>
        <header>
            <ng-content select="label"></ng-content>
        </header>
        <section class="notification-body">
            <i class="indicator" [ngClass]="iconType" *ngIf="iconType"></i>
            <ng-content select="h1"></ng-content>
            <ng-content select="h2"></ng-content>
            <ng-content select="p"></ng-content>
        </section>
        <footer>
            <ng-content select="button"></ng-content>
        </footer>
    `,
})
export class NovoModalNotificationElement implements OnInit {
  @Input()
  type: string;
  @Input()
  icon: string;

  @Output()
  cancel: EventEmitter<any> = new EventEmitter();

  iconType: string;

  constructor(private modalRef: NovoModalRef) {
    this.modalRef = modalRef;
  }

  close() {
    this.cancel.emit();
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
