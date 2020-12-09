import { NgModule } from '@angular/core';
import { TranslateDirective } from './translate/translate.directive';
import { TranslatePipe } from './translate/translate.pipe';

@NgModule({
  declarations: [TranslatePipe, TranslateDirective],
  exports: [TranslatePipe, TranslateDirective],
})
export class ChomskyModule {}
