// NG2
import { NgModule } from '@angular/core';
import { DecodeURIPipe } from './decode-uri/DecodeURI';
import { DefaultPipe } from './default/Default';
import { GroupByPipe } from './group-by/GroupBy';
// APP
import { PluralPipe } from './plural/Plural';

@NgModule({
  declarations: [PluralPipe, DecodeURIPipe, GroupByPipe, DefaultPipe],
  exports: [PluralPipe, DecodeURIPipe, GroupByPipe, DefaultPipe],
})
export class NovoPipesModule {}
