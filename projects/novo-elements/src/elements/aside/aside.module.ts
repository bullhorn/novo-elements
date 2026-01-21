import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoCommonModule } from 'novo-elements/elements/common';
import { AsideComponent } from './aside.component';
import { NovoAsideService } from './aside.service';

@NgModule({
  imports: [CommonModule, DragDropModule, NovoCommonModule, OverlayModule, PortalModule],
  declarations: [AsideComponent],
  providers: [NovoAsideService],
})
export class NovoAsideModule {}
