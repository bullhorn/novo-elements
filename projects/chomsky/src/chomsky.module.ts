import { NgModule } from '@angular/core';

import { TranslatePipe } from './translate/translate.pipe';
import { TranslateDirective } from './translate/translate.directive';

@NgModule({
  declarations: [TranslatePipe, TranslateDirective],
  exports: [TranslatePipe, TranslateDirective],
})
export class ChomskyModule {}
