// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoAvatarStackElement } from './avatar-stack';
import { NovoAvatarElement } from './avatar';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoAvatarElement, NovoAvatarStackElement],
  exports: [NovoAvatarElement, NovoAvatarStackElement],
})
export class NovoAvatarModule {}
