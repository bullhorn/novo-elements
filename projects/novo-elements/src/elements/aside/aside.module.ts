import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { AsideComponent } from './aside.component';
import { NovoAsideService } from './aside.service';

@NgModule({
  imports: [OverlayModule, PortalModule],
  declarations: [AsideComponent],
  providers: [NovoAsideService],
})
export class NovoAsideModule {}
