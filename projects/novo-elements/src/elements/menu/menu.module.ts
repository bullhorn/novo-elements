import { OverlayModule, FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MenuDirective } from './menu.directive';
import { MenuItemDirective } from './menu-item.directive';
import { MenuComponent } from './menu.component';
import { IMenuOptions } from './menu.types';
import { NovoMenuService } from './menu.service';
import { MenuContentComponent } from './menu-content.component';
import { MENU_OPTIONS } from './menu.tokens';
import { NovoIconModule } from '../icon/Icon.module';

@NgModule({
  declarations: [MenuDirective, MenuComponent, MenuContentComponent, MenuItemDirective],
  entryComponents: [MenuContentComponent],
  exports: [MenuDirective, MenuComponent, MenuItemDirective],
  imports: [CommonModule, OverlayModule, NovoIconModule],
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
