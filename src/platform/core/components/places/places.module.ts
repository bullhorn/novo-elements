import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { PlacesListComponent } from './places.component';
import { GooglePlacesService } from './places.service';
import { NovoIconModule } from '../icon/icon.module';
import { NovoListModule } from '../list/list.module';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    NovoIconModule,
    NovoListModule,
  ],
  declarations: [PlacesListComponent],
  exports: [PlacesListComponent],
  providers: [{ provide: GooglePlacesService, useClass: GooglePlacesService }],
})
export class GooglePlacesModule {}
