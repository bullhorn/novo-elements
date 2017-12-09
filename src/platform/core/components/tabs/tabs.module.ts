import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NovoNavComponent } from './tabs.component';
import { NovoTabComponent } from './tab.component';
import { NovoTabLinkComponent } from './tab-link.component';
import { NovoNavOutletComponent, NovoNavContentComponent } from './tab-outlet.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NovoNavComponent,
    NovoTabComponent,
    NovoTabLinkComponent,
    NovoNavOutletComponent,
    NovoNavContentComponent,
  ],
  exports: [
    NovoNavComponent,
    NovoTabComponent,
    NovoTabLinkComponent,
    NovoNavOutletComponent,
    NovoNavContentComponent,
  ],
})
export class NovoTabsModule {
}
