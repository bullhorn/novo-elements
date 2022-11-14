import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoCommonModule, NovoOptionModule } from 'novo-elements/common';
import { NovoCardModule } from 'novo-elements/components/card';
import { NovoFlexModule } from 'novo-elements/components/flex';
import { NovoIconModule } from 'novo-elements/components/icon';
import { PlacesListComponent } from './places.component';
import { GooglePlacesService } from './places.service';

@NgModule({
  declarations: [PlacesListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NovoOptionModule,
    NovoCommonModule,
    NovoIconModule,
    NovoFlexModule,
    NovoCardModule,
  ],
  exports: [PlacesListComponent],
  providers: [GooglePlacesService],
})
export class GooglePlacesModule {}
