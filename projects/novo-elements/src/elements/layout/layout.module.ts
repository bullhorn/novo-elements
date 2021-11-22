// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoLayoutContainer } from './container/layout-container.component';
import { NovoLayoutContent } from './content/layout-content.component';
import { NovoRailComponent } from './rail/rail.component';
import { NovoSidenavComponent } from './sidenav/sidenav.component';
@NgModule({
  imports: [CommonModule],
  declarations: [NovoLayoutContainer, NovoLayoutContent, NovoSidenavComponent, NovoRailComponent],
  exports: [NovoLayoutContainer, NovoLayoutContent, NovoSidenavComponent, NovoRailComponent],
})
export class NovoLayoutModule {}
