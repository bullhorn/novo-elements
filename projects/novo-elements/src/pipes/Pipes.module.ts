// NG2
import { NgModule } from '@angular/core';
// APP
import { PluralPipe } from './plural/Plural';
import { DecodeURIPipe } from './decode-uri/DecodeURI';
import { GroupByPipe } from './group-by/GroupBy';
import { DefaultPipe } from './default/Default';

@NgModule({
  declarations: [PluralPipe, DecodeURIPipe, GroupByPipe, DefaultPipe],
  exports: [PluralPipe, DecodeURIPipe, GroupByPipe, DefaultPipe],
})
export class NovoPipesModule {}
