import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { NovoModalContainerComponent } from './modal-container.component';

/**
 * Params that can be passed to the Modal
 */

export interface ModalParams {
  [propName: string]: any;
}
export class NovoModalParams implements ModalParams {}

export class NovoModalRef {
  constructor(public component: any, public params: any, private overlayRef: OverlayRef) {}

  private _beforeClose = new Subject<any>();
  private _afterClosed = new Subject<any>();

  componentInstance: NovoModalContainerComponent;
  isClosed: boolean = false;

  // Gets a promise that is resolved when the dialog is closed.
  get onClosed(): Promise<any> {
    return this._afterClosed.toPromise();
  }

  afterClosed(): Observable<any> {
    return this._afterClosed.asObservable();
  }

  beforeClose(): Observable<any> {
    return this._beforeClose.asObservable();
  }

  close(result?: any): void {
    // Listen for animation 'start' events
    this.componentInstance.animationStateChanged
      .pipe(
        filter((event) => event.phaseName === 'start'),
        take(1),
      )
      .subscribe(() => {
        this._beforeClose.next(result);
        this._beforeClose.complete();
        this.overlayRef.detachBackdrop();
      });

    // Listen for animation 'done' events
    this.componentInstance.animationStateChanged
      .pipe(
        filter((event) => event.phaseName === 'done' && event.toState === 'leave'),
        take(1),
      )
      .subscribe(() => {
        this.isClosed = true;
        this.overlayRef.dispose();
        this._afterClosed.next(result);
        this._afterClosed.complete();
        // Make sure to also clear the reference to the
        // component instance to avoid memory leaks
        this.componentInstance = null;
      });

    // Start exit animation
    this.componentInstance.startExitAnimation();
  }
}
