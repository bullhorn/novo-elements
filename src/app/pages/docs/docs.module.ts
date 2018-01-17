import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocsComponent } from './docs.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { AngularComponent } from './angular/angular.component';
import { CustomizingComponent } from './customizing/customizing.component';

import { docsRoutes } from './docs.routes';

@NgModule({
  declarations: [
    DocsComponent,
    GettingStartedComponent,
    AngularComponent,
    CustomizingComponent,
  ],
  imports: [
    // NG2
    CommonModule,
    // APP
    docsRoutes,
  ],
})
export class DocsModule {}
