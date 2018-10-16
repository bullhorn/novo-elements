// NG2
import { NgModule } from '@angular/core';
// APP
import { PluralPipe } from './plural/Plural';
import { DecodeURIPipe } from './decode-uri/DecodeURI';
import { GroupByPipe } from './group-by/GroupBy';

@NgModule({
  declarations: [PluralPipe, DecodeURIPipe, GroupByPipe],
  exports: [PluralPipe, DecodeURIPipe, GroupByPipe],
})
export class NovoPipesModule {}
