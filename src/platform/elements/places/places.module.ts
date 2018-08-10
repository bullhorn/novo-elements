import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PlacesListComponent } from './places.component';
import { GooglePlacesService } from './places.service';
import { NovoListModule } from '../list/List.module';

@NgModule({
  declarations: [PlacesListComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, NovoListModule],
  exports: [PlacesListComponent],
  providers: [GooglePlacesService],
})
export class GooglePlacesModule {}
