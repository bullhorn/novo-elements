// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
// APP
import { NovoPipesModule } from '../../pipes/Pipes.module';
import { NovoIconModule } from '../icon/Icon.module';
import { NovoChipsModule } from '../chips/Chips.module';
import { NovoOverlayModule } from '../overlay/Overlay.module';
import { NovoFieldModule } from '../field/field.module';
import { NovoColorSwatchComponent } from './color-swatch.component';
import { NovoColorPickerComponent } from './color-picker.component';
import { NovoColorInputElement } from './color-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NovoPipesModule,
    NovoFieldModule,
    NovoOverlayModule,
    TextMaskModule,
    NovoIconModule,
    NovoChipsModule,
  ],
  declarations: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent],
  exports: [NovoColorPickerComponent, NovoColorInputElement, NovoColorSwatchComponent],
})
export class NovoColorPickerModule {}
