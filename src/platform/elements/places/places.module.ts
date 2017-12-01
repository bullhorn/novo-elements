import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { PlacesListComponent } from './places.component';
import { GooglePlacesService } from './places.service';
import { NovoListModule } from '../list/List.module';


@NgModule({
  declarations: [
    PlacesListComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    NovoListModule
  ],
  exports: [
    PlacesListComponent
  ],
  providers : [
      { provide: GooglePlacesService, useClass: GooglePlacesService },
    ]
})
export class GooglePlacesModule {
}
