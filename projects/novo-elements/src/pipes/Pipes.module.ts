// NG2
import { NgModule } from '@angular/core';
import { DecodeURIPipe } from './decode-uri/DecodeURI';
import { DefaultPipe } from './default/Default';
import { GroupByPipe } from './group-by/GroupBy';
import { HighlightPipe } from './highlight/Highlight';
import { IsoDatePipe, IsoDateRangePipe, IsoTimePipe, IsoTimeRangePipe } from './iso8601';
import { PluralPipe } from './plural/Plural';

@NgModule({
  declarations: [PluralPipe, DecodeURIPipe, GroupByPipe, HighlightPipe, DefaultPipe, IsoTimePipe, IsoDatePipe, IsoTimeRangePipe, IsoDateRangePipe],
  exports: [PluralPipe, DecodeURIPipe, GroupByPipe, HighlightPipe, DefaultPipe, IsoTimePipe, IsoDatePipe, IsoTimeRangePipe, IsoDateRangePipe],
})
export class NovoPipesModule {}
