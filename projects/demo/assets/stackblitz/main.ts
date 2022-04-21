import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FieldInteractionApi, NovoElementsModule, NovoModalService, NovoToastService } from 'novo-elements';
import { NovoDocsExample } from './app/novo-docs-example';
import './polyfills';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, HttpClientModule, NovoElementsModule, ReactiveFormsModule],
  declarations: [NovoDocsExample],
  bootstrap: [NovoDocsExample],
  providers: [FieldInteractionApi, NovoToastService, NovoModalService],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
