import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { NovoElementsModule } from '../platform';

import { SharedModule } from './shared/shared.module';
import { appRoutingModule } from './app.routes';
import { PreloadSelectModulesStrategy } from './services';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  imports: [
    // NG2
    BrowserAnimationsModule,
    BrowserModule,
    // Vendor
    Ng2PageScrollModule,
    // NovoElements
    NovoElementsModule,
    // APP
    appRoutingModule,
    SharedModule,
  ],
  providers: [PreloadSelectModulesStrategy],
  declarations: [AppComponent, HomeComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
