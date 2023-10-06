import { NgModule } from '@angular/core';
import { NovoDragBoxParent as NovoDragBox } from 'novo-elements/elements/drag-drop/dragDropBox';

@NgModule({
    declarations: [NovoDragBox],
    exports: [NovoDragBox]
})
export class NovoDragDropModule {}