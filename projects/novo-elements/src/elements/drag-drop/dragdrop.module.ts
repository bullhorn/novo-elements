import { NgModule } from '@angular/core';
import { NovoDragBoxParent, NovoDragDropItem } from './dragDropMenuItem';

@NgModule({
    declarations: [NovoDragBoxParent, NovoDragDropItem],
    exports: [NovoDragBoxParent, NovoDragDropItem]
})
export class NovoDragDropModule {}