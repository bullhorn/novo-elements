// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

// APP
import { NovoButtonModule } from '../button/Button.module
import { NovoModalContainerComponent } from './modal-container.component';
import { NovoModalElement, NovoModalNotificationElement } from './modal.component';
import { NovoModalService } from './modal.service';

@NgModule({
  imports: [OverlayModule, PortalModule, CommonModule, NovoButtonModule],
  declarations: [NovoModalContainerComponent, NovoModalElement, NovoModalNotificationElement],
  exports: [NovoModalElement, NovoModalNotificationElement],
  providers: [NovoModalService],
  entryComponents: [NovoModalContainerComponent],
})
export class NovoModalModule {}
