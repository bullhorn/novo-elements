import { NgModule } from '@angular/core';

import { NovoButtonModule } from '../button';
import { NovoOverlayModule } from '../overlay';
import { NovoMenuComponent } from './menu.component';

@NgModule({
  imports: [NovoOverlayModule, NovoButtonModule],
  declarations: [NovoMenuComponent],
  exports: [NovoMenuComponent],
})
export class NovoMenuModule {}
