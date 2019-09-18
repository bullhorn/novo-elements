// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
// APP
import { NovoOverlayTemplateComponent } from './Overlay';

@NgModule({
  imports: [CommonModule, FormsModule, OverlayModule, ScrollingModule],
  declarations: [NovoOverlayTemplateComponent],
  exports: [NovoOverlayTemplateComponent, ScrollingModule],
})
export class NovoOverlayModule {}
