// NG2
import { NgModule } from '@angular/core';
// APP
import { PluralPipe } from './plural/Plural';
import { DecodeURIPipe } from './decode-uri/DecodeURI';

@NgModule({
    declarations: [PluralPipe, DecodeURIPipe],
    exports: [PluralPipe, DecodeURIPipe]
})
export class NovoPipesModule {
}
