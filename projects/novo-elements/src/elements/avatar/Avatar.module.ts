// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// APP
import { NovoAvatarElement } from './Avatar';
import { NovoAvatarStackElement } from './AvatarStack';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoAvatarElement, NovoAvatarStackElement],
  exports: [NovoAvatarElement, NovoAvatarStackElement],
})
export class NovoAvatarModule {}
