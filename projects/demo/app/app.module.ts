// NG2
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
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
import { NovoExamplesRoutesModule } from 'novo-examples';
import { environment } from '../environments/environment';
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

@NgModule({
  declarations: [AppComponent],
  imports: [
    // NG2
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ScrollingModule,
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
  bootstrap: [AppComponent],
})
export class AppModule {}
