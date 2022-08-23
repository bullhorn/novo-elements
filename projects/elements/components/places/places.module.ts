import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GooglePlacesService } from './places.service';
import { PlacesListComponent } from './places.component';
import { NovoListModule } from 'novo-elements/components/list';

@NgModule({
  declarations: [PlacesListComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, NovoListModule],
  exports: [PlacesListComponent],
  providers: [GooglePlacesService],
})
export class GooglePlacesModule {}
