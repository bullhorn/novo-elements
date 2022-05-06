// Ng
import { CompHostDirective } from './directives/host.directive';
import { NovoExamplesModule } from 'novo-examples';
import { AutomationExamplesComponent } from './examples/examples.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Vendor
import {
  AppBridgeService,
  DevAppBridgeService,
  FieldInteractionApi,
  FormUtils,
  NovoElementProviders,
  NovoElementsModule,
  NovoLabelService,
  NovoModalService,
  NovoToastService,
} from 'novo-elements';

import { AppComponent } from './app.component';

export function provideFieldInteractionAPI(toast, modal, formUtils, http, labels) {
  const fieldInteractionApi = new FieldInteractionApi(toast, modal, formUtils, http, labels);
  fieldInteractionApi.globals = {
    TEST: 'I AM A GLOBAL!',
  };
  return fieldInteractionApi;
}

export function provideAppBridgeService(http) {
  if (!environment.production) {
    return new DevAppBridgeService(http);
  }
  return new AppBridgeService();
}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'examples',
    pathMatch: 'full'
  },
  {
    path: 'examples',
    component: AutomationExamplesComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AutomationExamplesComponent,
    CompHostDirective
  ],
  entryComponents: [
    AutomationExamplesComponent
  ],
  exports: [
    AutomationExamplesComponent,
    RouterModule
  ],
  imports: [
    // Ng
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ScrollingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    // Vendor
    NovoElementsModule,
    NovoElementProviders.forRoot(),
    // App
    NovoExamplesModule,
  ],
  providers: [
    FormUtils,
    NovoLabelService,
    {
      provide: FieldInteractionApi,
      useFactory: provideFieldInteractionAPI,
      deps: [NovoToastService, NovoModalService, FormUtils, HttpClient, NovoLabelService],
    },
    // {
    //   provide: AppBridgeService,
    //   useFactory: provideAppBridgeService,
    //   deps: [HttpClient],
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

