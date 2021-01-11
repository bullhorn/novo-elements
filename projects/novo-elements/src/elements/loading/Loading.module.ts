// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoIsLoadingDirective, NovoLoadedDirective, NovoLoadingElement, NovoSkeletonDirective, NovoSpinnerElement } from './Loading';

@NgModule({
  imports: [CommonModule],
  declarations: [NovoLoadingElement, NovoSpinnerElement, NovoIsLoadingDirective, NovoLoadedDirective, NovoSkeletonDirective],
  exports: [NovoLoadingElement, NovoSpinnerElement, NovoIsLoadingDirective, NovoLoadedDirective, NovoSkeletonDirective],
})
export class NovoLoadingModule {}
