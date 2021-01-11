// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoAvatarElement } from './Avatar';
import { NovoAvatarStackElement } from './AvatarStack';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoAvatarElement, NovoAvatarStackElement],
  exports: [NovoAvatarElement, NovoAvatarStackElement],
})
export class NovoAvatarModule {}
