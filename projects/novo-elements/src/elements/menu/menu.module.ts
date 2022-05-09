import { FullscreenOverlayContainer, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NovoCommonModule } from '../common/common.module';
import { NovoIconModule } from '../icon/Icon.module';
import { MenuContentComponent } from './menu-content.component';
import { MenuItemDirective } from './menu-item.directive';
import { MenuComponent } from './menu.component';
import { MenuDirective } from './menu.directive';
import { NovoMenuService } from './menu.service';
import { MENU_OPTIONS } from './menu.tokens';
import { IMenuOptions } from './menu.types';

@NgModule({
  declarations: [MenuDirective, MenuComponent, MenuContentComponent, MenuItemDirective],
  exports: [MenuDirective, MenuComponent, MenuItemDirective],
  imports: [CommonModule, OverlayModule, NovoCommonModule, NovoIconModule],
})
export class NovoMenuModule {
  public static forRoot(options?: IMenuOptions): ModuleWithProviders<NovoMenuModule> {
    return {
      ngModule: NovoMenuModule,
      providers: [
        NovoMenuService,
        {
          provide: MENU_OPTIONS,
          useValue: options,
        },
        { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
      ],
    };
  }
}
