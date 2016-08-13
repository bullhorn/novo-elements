// NG2
import { NgModule } from '@angular/core';
// APP
import { NovoButtonModule } from './elements/button/Button.module';
import { NovoLoadingModule } from './elements/loading/Loading.module';
import { NovoCardModule } from './elements/card/Card.module';
import { NovoToastModule } from './elements/toast/Toast.module';
import { NovoTooltipModule } from './elements/tooltip/Tooltip.module';
import { NovoHeaderModule } from './elements/header/Header.module';
import { NovoTabModule } from './elements/tabs/Tabs.module';
import { NovoTilesModule } from './elements/tiles/Tiles.module';

@NgModule({
    exports: [
        NovoButtonModule,
        NovoLoadingModule,
        NovoCardModule,
        NovoToastModule,
        NovoTooltipModule,
        NovoHeaderModule,
        NovoTabModule,
        NovoTilesModule
    ],
    providers: []
})
export class NovoElementsModule {
}
