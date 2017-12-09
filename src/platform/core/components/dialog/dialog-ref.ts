/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { OverlayRef, GlobalPositionStrategy } from '@angular/cdk/overlay';
import { filter } from 'rxjs/operators/filter';
import { first } from 'rxjs/operators/first';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { IDialogPosition } from './dialog-config';
import { NovoDialogContainerComponent } from './dialog-container.component';

// TODO(jelbourn): resizing

// Counter for unique dialog ids.
let uniqueId: number = 0;

/**
 * Reference to a dialog opened via the NovoDialog service.
 */
export class NovoDialogRef<T> {
  /** The instance of component opened into the dialog. */
  public componentInstance: T;

  /** Whether the user is allowed to close the dialog. */
  public disableClose: boolean = this._containerInstance._config.disableClose;

  /** Subject for notifying the user that the dialog has finished opening. */
  private _afterOpen: Subject<void> = new Subject<void>();

  /** Subject for notifying the user that the dialog has finished closing. */
  private _afterClosed: Subject<any> = new Subject<any>();

  /** Subject for notifying the user that the dialog has started closing. */
  private _beforeClose: Subject<any> = new Subject<any>();

  /** Result to be passed to afterClosed. */
  private _result: any;

  constructor(
    private _overlayRef: OverlayRef,
    private _containerInstance: NovoDialogContainerComponent,
    readonly id: string = `novo-dialog-${uniqueId++}`) {

    // Emit when opening animation completes
    _containerInstance._animationStateChanged.pipe(
      filter((event: any) => event && event.phaseName === 'done' && event.toState === 'enter'),
      first(),
    )
      .subscribe(() => {
        this._afterOpen.next();
        this._afterOpen.complete();
      });

    // Dispose overlay when closing animation is complete
    _containerInstance._animationStateChanged.pipe(
      filter((event: any) => event && event.phaseName === 'done' && event.toState === 'exit'),
      first(),
    )
      .subscribe(() => {
        this._overlayRef.dispose();
        this._afterClosed.next(this._result);
        this._afterClosed.complete();
        this.componentInstance = undefined!;
      });
  }

  /**
   * Close the dialog.
   * @param dialogResult Optional result to return to the dialog opener.
   */
  public close(dialogResult?: any): void {
    this._result = dialogResult;

    // Transition the backdrop in parallel to the dialog.
    this._containerInstance._animationStateChanged.pipe(
      filter((event: any) => event && event.phaseName === 'start'),
      first(),
    )
      .subscribe(() => {
        this._beforeClose.next(dialogResult);
        this._beforeClose.complete();
        this._overlayRef.detachBackdrop();
      });

    this._containerInstance._startExitAnimation();
  }

  /**
   * Gets an observable that is notified when the dialog is finished opening.
   */
  public afterOpen(): Observable<void> {
    return this._afterOpen.asObservable();
  }

  /**
   * Gets an observable that is notified when the dialog is finished closing.
   */
  public afterClosed(): Observable<any> {
    return this._afterClosed.asObservable();
  }

  /**
   * Gets an observable that is notified when the dialog has started closing.
   */
  public beforeClose(): Observable<any> {
    return this._beforeClose.asObservable();
  }

  /**
   * Gets an observable that emits when the overlay's backdrop has been clicked.
   */
  public backdropClick(): Observable<void> {
    return this._overlayRef.backdropClick();
  }

  /**
   * Gets an observable that emits when keydown events are targeted on the overlay.
   */
  public keydownEvents(): Observable<KeyboardEvent> {
    return this._overlayRef.keydownEvents();
  }

  /**
   * Updates the dialog's position.
   * @param position New dialog position.
   */
  public updatePosition(position?: IDialogPosition): this {
    let strategy: GlobalPositionStrategy = this._getPositionStrategy();

    if (position && (position.left || position.right)) {
      position.left ? strategy.left(position.left) : strategy.right(position.right);
    } else {
      strategy.centerHorizontally();
    }

    if (position && (position.top || position.bottom)) {
      position.top ? strategy.top(position.top) : strategy.bottom(position.bottom);
    } else {
      strategy.centerVertically();
    }

    this._overlayRef.updatePosition();

    return this;
  }

  /**
   * Updates the dialog's width and height.
   * @param width New width of the dialog.
   * @param height New height of the dialog.
   */
  public updateSize(width: string = 'auto', height: string = 'auto'): this {
    this._getPositionStrategy().width(width).height(height);
    this._overlayRef.updatePosition();
    return this;
  }

  /** Fetches the position strategy object from the overlay ref. */
  private _getPositionStrategy(): GlobalPositionStrategy {
    return this._overlayRef.getConfig().positionStrategy as GlobalPositionStrategy;
  }
}
