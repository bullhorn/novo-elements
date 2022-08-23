// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoSidenavComponent } from './sidenav/sidenav.component';
import { NovoRailComponent } from './rail/rail.component';
import { NovoLayoutContent } from './content/layout-content.component';
import { NovoLayoutContainer } from './container/layout-container.component';
@NgModule({
  imports: [CommonModule],
  declarations: [NovoLayoutContainer, NovoLayoutContent, NovoSidenavComponent, NovoRailComponent],
  exports: [NovoLayoutContainer, NovoLayoutContent, NovoSidenavComponent, NovoRailComponent],
})
export class NovoLayoutModule {}
