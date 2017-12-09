/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { ESCAPE } from '@angular/cdk/keycodes';
import {
  BlockScrollStrategy,
  Overlay,
  OverlayRef,
  OverlayConfig,
  ScrollStrategy,
} from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { filter } from 'rxjs/operators/filter';
import { startWith } from 'rxjs/operators/startWith';
import { Location } from '@angular/common';
import {
  ComponentRef,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Optional,
  SkipSelf,
  TemplateRef,
  Provider,
} from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { Subject } from 'rxjs/Subject';
import { of as observableOf } from 'rxjs/observable/of';
import { NovoDialogConfig, IAlertConfig, IConfirmConfig, INotificationConfig } from './dialog-config';
import { NovoDialogRef } from './dialog-ref';
import { NovoDialogContainerComponent } from './dialog-container.component';
import { NovoAlertDialogComponent, NovoConfirmDialogComponent, NovoNotificationDialogComponent } from './dialog.component';

export const NOVO_DIALOG_DATA: InjectionToken<any> = new InjectionToken<any>('NovoDialogData');

/** Injection token that determines the scroll handling while the dialog is open. */
export const NOVO_DIALOG_SCROLL_STRATEGY: InjectionToken<any> =
  new InjectionToken<() => ScrollStrategy>('novo-dialog-scroll-strategy');

/** @docs-private */
export function NOVO_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay):
  () => BlockScrollStrategy {
  return () => overlay.scrollStrategies.block();
}

/** @docs-private */
export const NOVO_DIALOG_SCROLL_STRATEGY_PROVIDER: Provider = {
  provide: NOVO_DIALOG_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: NOVO_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
};

/**
 * Service to open Novoerial Design modal dialogs.
 */
@Injectable()
export class NovoDialog {
  /** Keeps track of the currently-open dialogs. */
  get openDialogs(): NovoDialogRef<any>[] {
    return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogsAtThisLevel;
  }

  /** Stream that emits when a dialog has been opened. */
  get afterOpen(): Subject<NovoDialogRef<any>> {
    return this._parentDialog ? this._parentDialog.afterOpen : this._afterOpenAtThisLevel;
  }

  get _afterAllClosed(): Subject<any> {
    const parent: NovoDialog = this._parentDialog;
    return parent ? parent._afterAllClosed : this._afterAllClosedAtThisLevel;
  }

  /**
   * Stream that emits when all open dialog have finished closing.
   * Will emit on subscribe if there are no open dialogs to begin with.
   */
  public afterAllClosed: Observable<void> = defer<void>(() => this.openDialogs.length ?
    this._afterAllClosed :
    this._afterAllClosed.pipe(startWith(undefined)));

  private _openDialogsAtThisLevel: NovoDialogRef<any>[] = [];
  private _afterAllClosedAtThisLevel: Subject<void> = new Subject<void>();
  private _afterOpenAtThisLevel: Subject<NovoDialogRef<any>> = new Subject<NovoDialogRef<any>>();

  constructor(
    private _overlay: Overlay,
    private _injector: Injector,
    @Optional() location: Location,
    @Inject(NOVO_DIALOG_SCROLL_STRATEGY) private _scrollStrategy: any,
    @Optional() @SkipSelf() private _parentDialog: NovoDialog) {

    // Close all of the dialogs when the user goes forwards/backwards in history or when the
    // location hash changes. Note that this usually doesn't include clicking on links (unless
    // the user is using the `HashLocationStrategy`).
    if (!_parentDialog && location) {
      location.subscribe(() => this.closeAll());
    }
  }

  /**
   * Opens a modal dialog containing the given component.
   * @param componentOrTemplateRef Type of the component to load into the dialog,
   *     or a TemplateRef to instantiate as the dialog content.
   * @param config Extra configuration options.
   * @returns Reference to the newly-opened dialog.
   */
  public open<T, D = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    config?: NovoDialogConfig<D>): NovoDialogRef<T> {

    config = _applyConfigDefaults(config);

    if (config.id && this.getDialogById(config.id)) {
      throw Error(`Dialog with id "${config.id}" exists already. The dialog id must be unique.`);
    }

    const overlayRef: OverlayRef = this._createOverlay(config);
    const dialogContainer: NovoDialogContainerComponent = this._attachDialogContainer(overlayRef, config);
    const dialogRef: NovoDialogRef<T> =
      this._attachDialogContent<T>(componentOrTemplateRef, dialogContainer, overlayRef, config);

    this.openDialogs.push(dialogRef);
    dialogRef.afterClosed().subscribe(() => this._removeOpenDialog(dialogRef));
    this.afterOpen.next(dialogRef);

    return dialogRef;
  }

  /**
   * params:
   * - config: IAlertConfig {
   *     message: string;
   *     title?: string;
   *     viewContainerRef?: ViewContainerRef;
   *     closeButton?: string;
   * }
   *
   * Opens an alert dialog with the provided config.
   * Returns an NovoDialogRef<TdAlertDialogComponent> object.
   */
  public openAlert(config: IAlertConfig): NovoDialogRef<NovoAlertDialogComponent> {
    let dialogConfig: NovoDialogConfig = this._createConfig(config);
    let dialogRef: NovoDialogRef<NovoAlertDialogComponent> =
      this.open(NovoAlertDialogComponent, dialogConfig);
    let alertDialogComponent: NovoAlertDialogComponent = dialogRef.componentInstance;
    alertDialogComponent.title = config.title;
    alertDialogComponent.message = config.message;
    if (config.closeButton) {
      alertDialogComponent.closeButton = config.closeButton;
    }
    return dialogRef;
  }

  /**
   * params:
   * - config: IConfirmConfig {
   *     message: string;
   *     title?: string;
   *     viewContainerRef?: ViewContainerRef;
   *     acceptButton?: string;
   *     cancelButton?: string;
   * }
   *
   * Opens a confirm dialog with the provided config.
   * Returns an NovoDialogRef<TdConfirmDialogComponent> object.
   */
  public openConfirm(config: IConfirmConfig): NovoDialogRef<NovoConfirmDialogComponent> {
    let dialogConfig: NovoDialogConfig = this._createConfig(config);
    let dialogRef: NovoDialogRef<NovoConfirmDialogComponent> =
      this.open(NovoConfirmDialogComponent, dialogConfig);
    let confirmDialogComponent: NovoConfirmDialogComponent = dialogRef.componentInstance;
    confirmDialogComponent.title = config.title;
    confirmDialogComponent.message = config.message;
    if (config.acceptButton) {
      confirmDialogComponent.acceptButton = config.acceptButton;
    }
    if (config.cancelButton) {
      confirmDialogComponent.cancelButton = config.cancelButton;
    }
    return dialogRef;
  }

  /**
   * params:
   * - config: INotificationConfig {
   *     message: string;
   *     title?: string;
   *     viewContainerRef?: ViewContainerRef;
   *     buttons?: string[];
   * }
   *
   * Opens a confirm dialog with the provided config.
   * Returns an NovoDialogRef<TdConfirmDialogComponent> object.
   */
  public openNotification(config: INotificationConfig): NovoDialogRef<NovoNotificationDialogComponent> {
    let dialogConfig: NovoDialogConfig = this._createConfig(config);
    let dialogRef: NovoDialogRef<NovoNotificationDialogComponent> = this.open(NovoNotificationDialogComponent, dialogConfig);
    let dialogComponent: NovoNotificationDialogComponent = dialogRef.componentInstance;
    dialogComponent.title = config.title;
    dialogComponent.message = config.message;
    if (config.type) {
      dialogComponent.type = config.type;
    }
    if (config.buttons) {
      dialogComponent.buttons = config.buttons;
    }
    return dialogRef;
  }

  /**
   * Closes all of the currently-open dialogs.
   */
  public closeAll(): void {
    let i: number = this.openDialogs.length;

    while (i--) {
      // The `_openDialogs` property isn't updated after close until the rxjs subscription
      // runs on the next microtask, in addition to modifying the array as we're going
      // through it. We loop through all of them and call close without assuming that
      // they'll be removed from the list instantaneously.
      this.openDialogs[i].close();
    }
  }

  /**
   * Finds an open dialog by its id.
   * @param id ID to use when looking up the dialog.
   */
  public getDialogById(id: string): NovoDialogRef<any> | undefined {
    return this.openDialogs.find((dialog: NovoDialogRef<any>) => dialog.id === id);
  }

  /**
   * Creates the overlay into which the dialog will be loaded.
   * @param config The dialog configuration.
   * @returns A promise resolving to the OverlayRef for the created overlay.
   */
  private _createOverlay(config: NovoDialogConfig): OverlayRef {
    const overlayConfig: OverlayConfig = this._getOverlayConfig(config);
    return this._overlay.create(overlayConfig);
  }

  /**
   * Creates an overlay config from a dialog config.
   * @param dialogConfig The dialog configuration.
   * @returns The overlay configuration.
   */
  private _getOverlayConfig(dialogConfig: NovoDialogConfig): OverlayConfig {
    const state: OverlayConfig = new OverlayConfig({
      positionStrategy: this._overlay.position().global(),
      scrollStrategy: this._scrollStrategy(),
      panelClass: dialogConfig.panelClass,
      hasBackdrop: dialogConfig.hasBackdrop,
      direction: dialogConfig.direction,
      minWidth: dialogConfig.minWidth,
      minHeight: dialogConfig.minHeight,
      maxWidth: dialogConfig.maxWidth,
      maxHeight: dialogConfig.maxHeight,
    });

    if (dialogConfig.backdropClass) {
      state.backdropClass = dialogConfig.backdropClass;
    }

    return state;
  }

  /**
   * Attaches an NovoDialogContainerComponent to a dialog's already-created overlay.
   * @param overlay Reference to the dialog's underlying overlay.
   * @param config The dialog configuration.
   * @returns A promise resolving to a ComponentRef for the attached container.
   */
  private _attachDialogContainer(overlay: OverlayRef, config: NovoDialogConfig): NovoDialogContainerComponent {
    let containerPortal: ComponentPortal<NovoDialogContainerComponent> = new ComponentPortal(NovoDialogContainerComponent, config.viewContainerRef);
    let containerRef: ComponentRef<NovoDialogContainerComponent> = overlay.attach(containerPortal);
    containerRef.instance._config = config;

    return containerRef.instance;
  }

  /**
   * Attaches the user-provided component to the already-created NovoDialogContainerComponent.
   * @param componentOrTemplateRef The type of component being loaded into the dialog,
   *     or a TemplateRef to instantiate as the content.
   * @param dialogContainer Reference to the wrapping NovoDialogContainerComponent.
   * @param overlayRef Reference to the overlay in which the dialog resides.
   * @param config The dialog configuration.
   * @returns A promise resolving to the NovoDialogRef that should be returned to the user.
   */
  private _attachDialogContent<T>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    dialogContainer: NovoDialogContainerComponent,
    overlayRef: OverlayRef,
    config: NovoDialogConfig): NovoDialogRef<T> {

    // Create a reference to the dialog we're creating in order to give the user a handle
    // to modify and close it.
    const dialogRef: NovoDialogRef<T> = new NovoDialogRef<T>(overlayRef, dialogContainer, config.id);

    // When the dialog backdrop is clicked, we want to close it.
    if (config.hasBackdrop) {
      overlayRef.backdropClick().subscribe(() => {
        if (!dialogRef.disableClose) {
          dialogRef.close();
        }
      });
    }

    // Close when escape keydown event occurs
    overlayRef.keydownEvents().pipe(
      filter((event: any) => event.keyCode === ESCAPE && !dialogRef.disableClose),
    ).subscribe(() => dialogRef.close());

    if (componentOrTemplateRef instanceof TemplateRef) {
      dialogContainer.attachTemplatePortal(new TemplatePortal<T>(componentOrTemplateRef, undefined, <any>{ $implicit: config.data, dialogRef }));
    } else {
      const injector: Injector = this._createInjector<T>(config, dialogRef, dialogContainer);
      const contentRef: ComponentRef<T> = dialogContainer.attachComponentPortal<T>(new ComponentPortal(componentOrTemplateRef, undefined, injector));
      dialogRef.componentInstance = contentRef.instance;
    }

    dialogRef
      .updateSize(config.width, config.height)
      .updatePosition(config.position);

    return dialogRef;
  }

  /**
   * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
   * of a dialog to close itself and, optionally, to return a value.
   * @param config Config object that is used to construct the dialog.
   * @param dialogRef Reference to the dialog.
   * @param container Dialog container element that wraps all of the contents.
   * @returns The custom injector that can be used inside the dialog.
   */
  private _createInjector<T>(
    config: NovoDialogConfig,
    dialogRef: NovoDialogRef<T>,
    dialogContainer: NovoDialogContainerComponent): PortalInjector {

    const userInjector: Injector = config && config.viewContainerRef && config.viewContainerRef.injector;
    const injectionTokens: WeakMap<any, any> = new WeakMap();

    injectionTokens.set(NovoDialogRef, dialogRef);
    // The NovoDialogContainerComponent is injected in the portal as the NovoDialogContainerComponent and the dialog's
    // content are created out of the same ViewContainerRef and as such, are siblings for injector
    // purposes.  To allow the hierarchy that is expected, the NovoDialogContainerComponent is explicitly
    // added to the injection tokens.
    injectionTokens.set(NovoDialogContainerComponent, dialogContainer);
    injectionTokens.set(NOVO_DIALOG_DATA, config.data);
    injectionTokens.set(Directionality, {
      value: config.direction,
      change: observableOf(),
    });

    return new PortalInjector(userInjector || this._injector, injectionTokens);
  }

  /**
   * Removes a dialog from the array of open dialogs.
   * @param dialogRef Dialog to be removed.
   */
  private _removeOpenDialog(dialogRef: NovoDialogRef<any>): void {
    const index: number = this.openDialogs.indexOf(dialogRef);

    if (index > -1) {
      this.openDialogs.splice(index, 1);

      // no open dialogs are left, call next on afterAllClosed Subject
      if (!this.openDialogs.length) {
        this._afterAllClosed.next();
      }
    }
  }

  private _createConfig(config: NovoDialogConfig): NovoDialogConfig {
    let dialogConfig: NovoDialogConfig = new NovoDialogConfig();
    dialogConfig.viewContainerRef = config.viewContainerRef;
    dialogConfig.disableClose = config.disableClose;
    return dialogConfig;
  }
}

/**
 * Applies default options to the dialog config.
 * @param config Config to be modified.
 * @returns The new configuration object.
 */
function _applyConfigDefaults(config?: NovoDialogConfig): NovoDialogConfig {
  return Object.assign({}, new NovoDialogConfig(), config);
}
