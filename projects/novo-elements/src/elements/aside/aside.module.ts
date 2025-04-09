import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AsideComponent } from './aside.component';
import { NovoAsideService } from './aside.service';

@NgModule({
  imports: [CommonModule, DragDropModule, OverlayModule, PortalModule],
  declarations: [AsideComponent],
  providers: [NovoAsideService],
})
export class NovoAsideModule {}
