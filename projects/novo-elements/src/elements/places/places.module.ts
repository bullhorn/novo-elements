import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoListModule } from '../list/List.module';
import { PlacesListComponent } from './places.component';
import { GooglePlacesService } from './places.service';

@NgModule({
  declarations: [PlacesListComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, NovoListModule],
  exports: [PlacesListComponent],
  providers: [GooglePlacesService],
})
export class GooglePlacesModule {}
