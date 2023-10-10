import { NgModule } from '@angular/core';
import { NovoDragDropController } from './dragDrop.controller';
import { NovoDragBoxParent } from './dragDropBox';

@NgModule({
    declarations: [NovoDragBoxParent],
    exports: [NovoDragBoxParent],
    providers: [NovoDragDropController]
})
export class NovoDragDropModule {}