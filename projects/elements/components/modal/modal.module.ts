// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoModalService } from './modal.service';
import { NovoModalElement, NovoModalNotificationElement } from './modal.component';
import { NovoModalContainerComponent } from './modal-container.component';
import { NovoButtonModule } from 'novo-elements/components/button';

@NgModule({
  imports: [OverlayModule, PortalModule, CommonModule, NovoButtonModule],
  declarations: [NovoModalContainerComponent, NovoModalElement, NovoModalNotificationElement],
  exports: [NovoModalElement, NovoModalNotificationElement],
  providers: [NovoModalService],
})
export class NovoModalModule {}
