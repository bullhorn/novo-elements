// NG2
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { NovoExamplesRoutesModule } from 'novo-examples';

// Vendor
import {
  NovoElementsModule,
  NovoElementProviders,
  FormUtils,
  NovoLabelService,
  FieldInteractionApi,
  NovoToastService,
  NovoModalService,
  AppBridgeService,
  DevAppBridgeService,
  // NovoTemplateService,
} from 'novo-elements';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

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

@NgModule({
  declarations: [AppComponent],
  imports: [
    // NG2
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ScrollDispatchModule,
    // Vendor
    NovoElementsModule,
    NovoElementProviders.forRoot(),
    // APP
    NovoExamplesRoutesModule,
  ],
  providers: [
    // NovoTemplateService,
    FormUtils,
    NovoLabelService,
    {
      provide: FieldInteractionApi,
      useFactory: provideFieldInteractionAPI,
      deps: [NovoToastService, NovoModalService, FormUtils, HttpClient, NovoLabelService],
    },
    {
      provide: AppBridgeService,
      useFactory: provideAppBridgeService,
      deps: [HttpClient],
    },
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
