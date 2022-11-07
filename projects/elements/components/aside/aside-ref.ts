import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { AsideComponent } from './aside.component';

export class NovoAsideRef<T = any, R = any> {
  constructor(public component: any, public params: T, private overlayRef: OverlayRef) {}

  private _beforeClose = new Subject<R>();
  private _afterClosed = new Subject<R>();
  isClosed: boolean = false;
  componentInstance: AsideComponent;

  // Gets a promise that is resolved when the dialog is closed.
  get onClosed(): Promise<R> {
    return this._afterClosed.toPromise();
  }

  afterClosed(): Observable<R> {
    return this._afterClosed.asObservable();
  }

  beforeClose(): Observable<R> {
    return this._beforeClose.asObservable();
  }

  close(result?: R): void {
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
