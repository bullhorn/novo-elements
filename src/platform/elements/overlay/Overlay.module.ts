// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
// APP
import { NovoOverlayTemplateComponent } from './Overlay';

@NgModule({
  imports: [CommonModule, FormsModule, OverlayModule, ScrollDispatchModule],
  declarations: [NovoOverlayTemplateComponent],
  exports: [NovoOverlayTemplateComponent],
})
export class NovoOverlayModule {}
