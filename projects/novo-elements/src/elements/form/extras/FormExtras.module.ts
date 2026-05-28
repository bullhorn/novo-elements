// NG2
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoCheckboxModule } from 'novo-elements/elements/checkbox';
import { NovoFieldModule } from 'novo-elements/elements/field';
import { NovoFlexModule } from 'novo-elements/elements/flex';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import { NovoPickerModule } from 'novo-elements/elements/picker';
import { GooglePlacesModule } from 'novo-elements/elements/places';
import { NovoSelectModule } from 'novo-elements/elements/select';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
import { NovoPipesModule } from 'novo-elements/pipes';
import { NovoAddressElement } from './address/Address';
import { NovoFileInputElement } from './file/FileInput';
import { NumberRangeComponent } from './number-range/number-range.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NovoPipesModule,
    NovoButtonModule,
    NovoSelectModule,
    NovoPickerModule,
    NovoLoadingModule,
    NovoTooltipModule,
    NovoCheckboxModule,
    DragDropModule,
    NovoFlexModule,
    NovoFieldModule,
    ReactiveFormsModule,
    GooglePlacesModule,
  ],
  declarations: [NovoAddressElement, NovoFileInputElement, NumberRangeComponent],
  exports: [NovoAddressElement, NovoFileInputElement, NumberRangeComponent],
})
export class NovoFormExtrasModule {}
