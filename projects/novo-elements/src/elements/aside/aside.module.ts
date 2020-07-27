import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { NovoAsideService } from './aside.service';
import { AsideComponent } from './aside.component';

@NgModule({
  imports: [OverlayModule, PortalModule],
  declarations: [AsideComponent],
  providers: [NovoAsideService],
  entryComponents: [AsideComponent],
})
export class NovoAsideModule {}
