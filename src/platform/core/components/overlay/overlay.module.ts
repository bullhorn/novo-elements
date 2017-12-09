import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { NovoOverlayTemplateComponent, DEFAULT_OVERLAY_SCROLL_STRATEGY_PROVIDER } from './overlay.component';

@NgModule({
  imports: [CommonModule, FormsModule, OverlayModule],
  declarations: [NovoOverlayTemplateComponent],
  exports: [NovoOverlayTemplateComponent],
  providers: [DEFAULT_OVERLAY_SCROLL_STRATEGY_PROVIDER],
})
export class NovoOverlayModule {
}
