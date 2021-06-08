// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// APP
import { NovoOverlayTemplateComponent } from './Overlay';

@NgModule({
  imports: [CommonModule, FormsModule, OverlayModule, ScrollingModule],
  declarations: [NovoOverlayTemplateComponent],
  exports: [NovoOverlayTemplateComponent, ScrollingModule],
})
export class NovoOverlayModule {}
