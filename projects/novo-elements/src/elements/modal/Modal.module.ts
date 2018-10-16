// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoButtonModule } from './../button/Button.module';
import { NovoModalContainerElement, NovoModalElement, NovoModalNotificationElement } from './Modal';

@NgModule({
  imports: [CommonModule, NovoButtonModule],
  declarations: [NovoModalContainerElement, NovoModalElement, NovoModalNotificationElement],
  exports: [NovoModalElement, NovoModalNotificationElement],
  entryComponents: [NovoModalContainerElement],
})
export class NovoModalModule {}
