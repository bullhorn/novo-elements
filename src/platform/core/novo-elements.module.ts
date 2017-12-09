import { NgModule } from '@angular/core';

import { NovoButtonModule } from './components/button';
import { NovoHeaderModule } from './components/header';
import { NovoLoadingModule } from './components/loading';
import { NovoListModule } from './components/list';
import { NovoSlidesModule } from './components/slides';
import { NovoLabelService } from './services';
import { NovoTilesModule } from './components/tiles';
import { NovoIconModule } from './components/icon';
import { NovoOverlayModule } from './components/overlay';
import { NovoMenuModule } from './components/menu';
import { NovoCardModule } from './components/card';
import { NovoDialogModule } from './components/dialog';
import { NovoTabsModule } from './components/tabs';
import { NovoValueModule } from './components/value';

import { GroupByPipe, DecodeURIPipe } from './pipes';

@NgModule({
  declarations: [
    GroupByPipe,
    DecodeURIPipe,
  ],
  exports: [
    // Modules
    NovoButtonModule,
    NovoHeaderModule,
    NovoLoadingModule,
    NovoListModule,
    NovoSlidesModule,
    NovoTilesModule,
    NovoIconModule,
    NovoOverlayModule,
    NovoMenuModule,
    NovoCardModule,
    NovoDialogModule,
    NovoTabsModule,
    NovoValueModule,
    // Pipes
    GroupByPipe,
    DecodeURIPipe,
  ],
  providers: [
    NovoLabelService,
  ],
})
export class NovoElementsModule {
}
