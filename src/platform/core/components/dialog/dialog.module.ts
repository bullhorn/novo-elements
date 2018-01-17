/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';
import { NovoCardModule } from './../card/card.module';
import { NovoIconModule } from './../icon/icon.module';
import { NovoButtonModule } from './../button/button.module';
import { NovoHeaderModule } from './../header/header.module';
import {
  NovoDialog,
  NOVO_DIALOG_SCROLL_STRATEGY_PROVIDER,
} from './dialog.service';
import { NovoDialogContainerComponent } from './dialog-container.component';
import {
  NovoAlertDialogComponent,
  NovoConfirmDialogComponent,
  NovoNotificationDialogComponent,
} from './dialog.component';
// import {
//     NovoDialogClose,
//     NovoDialogContent,
//     NovoDialogTitle,
//     NovoDialogActions
// } from './dialog-content-directives';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    A11yModule,
    NovoCardModule,
    NovoButtonModule,
    NovoHeaderModule,
    NovoIconModule,
  ],
  exports: [NovoDialogContainerComponent],
  declarations: [
    NovoDialogContainerComponent,
    NovoAlertDialogComponent,
    NovoConfirmDialogComponent,
    NovoNotificationDialogComponent,
  ],
  providers: [NovoDialog, NOVO_DIALOG_SCROLL_STRATEGY_PROVIDER],
  entryComponents: [
    NovoDialogContainerComponent,
    NovoAlertDialogComponent,
    NovoConfirmDialogComponent,
    NovoNotificationDialogComponent,
  ],
})
export class NovoDialogModule {}
