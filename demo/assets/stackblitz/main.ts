import './polyfills';

import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NovoElementsModule } from 'novo-elements';
import { NovoDocsExample } from './app/novo-docs-example';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, HttpClientModule, NovoElementsModule, ReactiveFormsModule],
  entryComponents: [NovoDocsExample],
  declarations: [NovoDocsExample],
  bootstrap: [NovoDocsExample],
  providers: [],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
