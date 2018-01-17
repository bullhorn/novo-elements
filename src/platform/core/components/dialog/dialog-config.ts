/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { ViewContainerRef } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';

/** Valid ARIA roles for a dialog element. */
export type DialogRole = 'dialog' | 'alertdialog';

/** Possible overrides for a dialog's position. */
export interface IDialogPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}
export interface IDialogConfig {
  title?: string;
  message: string;
  viewContainerRef?: ViewContainerRef;
  disableClose?: boolean;
}

export interface IAlertConfig extends IDialogConfig {
  closeButton?: string;
}

export interface IConfirmConfig extends IDialogConfig {
  acceptButton?: string;
  cancelButton?: string;
}

export interface INotificationConfig extends IDialogConfig {
  type?: string;
  buttons?: string[];
}

/**
 * Configuration for opening a modal dialog with the NovoDialog service.
 */
export class NovoDialogConfig<D = any> {
  /**
   * Where the attached component should live in Angular's *logical* component tree.
   * This affects what is available for injection and the change detection order for the
   * component instantiated inside of the dialog. This does not affect where the dialog
   * content will be rendered.
   */
  public viewContainerRef?: ViewContainerRef;

  /** ID for the dialog. If omitted, a unique one will be generated. */
  public id?: string;

  /** The ARIA role of the dialog element. */
  public role?: DialogRole = 'dialog';

  /** Custom class for the overlay pane. */
  public panelClass?: string | string[] = '';

  /** Whether the dialog has a backdrop. */
  public hasBackdrop?: boolean = true;

  /** Custom class for the backdrop, */
  public backdropClass?: string = '';

  /** Whether the user can use escape or clicking outside to close a modal. */
  public disableClose?: boolean = false;

  /** Width of the dialog. */
  public width?: string = '';

  /** Height of the dialog. */
  public height?: string = '';

  /** Min-width of the dialog. If a number is provided, pixel units are assumed. */
  public minWidth?: number | string;

  /** Min-height of the dialog. If a number is provided, pixel units are assumed. */
  public minHeight?: number | string;

  /** Max-width of the dialog. If a number is provided, pixel units are assumed. Defaults to 80vw */
  public maxWidth?: number | string = '80vw';

  /** Max-height of the dialog. If a number is provided, pixel units are assumed. */
  public maxHeight?: number | string;

  /** Position overrides. */
  public position?: IDialogPosition;

  /** Data being injected into the child component. */
  public data?: D;

  /** Layout direction for the dialog's content. */
  public direction?: Direction = 'ltr';

  /** ID of the element that describes the dialog.  */
  public ariaDescribedBy?: string;

  // TODO(jelbourn): add configuration for lifecycle hooks, ARIA labelling.
}
