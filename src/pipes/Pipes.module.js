// NG2
import { NgModule } from '@angular/core';
// APP
import { PluralPipe } from './plural/Plural';

@NgModule({
    declarations: [PluralPipe],
    exports: [PluralPipe]
})
export class NovoPipesModule {
}
