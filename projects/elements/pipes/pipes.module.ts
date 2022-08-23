// NG2
import { NgModule } from '@angular/core';
import { PluralPipe } from './plural/plural';
import { IsoDatePipe, IsoDateRangePipe, IsoTimePipe, IsoTimeRangePipe } from './iso8601';
import { HighlightPipe } from './highlight/highlight';
import { GroupByPipe } from './group-by/group-by';
import { DefaultPipe } from './default/default';
import { DecodeURIPipe } from './decode-uri/decode-uri';

@NgModule({
  declarations: [PluralPipe, DecodeURIPipe, GroupByPipe, HighlightPipe, DefaultPipe, IsoTimePipe, IsoDatePipe, IsoTimeRangePipe, IsoDateRangePipe],
  exports: [PluralPipe, DecodeURIPipe, GroupByPipe, HighlightPipe, DefaultPipe, IsoTimePipe, IsoDatePipe, IsoTimeRangePipe, IsoDateRangePipe],
})
export class NovoPipesModule {}
