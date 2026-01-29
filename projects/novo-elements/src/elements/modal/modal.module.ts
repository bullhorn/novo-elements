// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoConfirmModal } from './confirm-modal/confirm-modal.component';
import { NovoModalContainerComponent } from './modal-container.component';
import { NovoModalElement, NovoModalNotificationElement } from './modal.component';
import { NovoModalService } from './modal.service';

@NgModule({
  imports: [OverlayModule, PortalModule, CommonModule, NovoButtonModule],
  declarations: [NovoModalContainerComponent, NovoModalElement, NovoModalNotificationElement, NovoConfirmModal],
  exports: [NovoModalElement, NovoModalNotificationElement, NovoConfirmModal],
  providers: [NovoModalService],
})
export class NovoModalModule {}
