import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoListModule } from 'novo-elements/elements/list';
import { PlacesListComponent } from './places.component';
import { GooglePlacesService } from './places.service';

@NgModule({ declarations: [PlacesListComponent],
    exports: [PlacesListComponent], imports: [CommonModule, FormsModule, NovoListModule], providers: [GooglePlacesService, provideHttpClient(withInterceptorsFromDi())] })
export class GooglePlacesModule {}
