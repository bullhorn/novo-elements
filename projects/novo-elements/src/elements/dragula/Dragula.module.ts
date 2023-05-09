// NG2
import { NgModule } from '@angular/core';
// APP
import { NovoDragulaElement } from './Dragula';

/**
* @deprecated since v8.0.0 - slated for deletion.
*
* Moving away from all CommonJS dependencies to improve tree-shaking.
*
* Please look at built-in ng or third party drag-drop libraries like
* angular-draggable-droppable, ngx-drag-drop, ngx-sortablejs, ng2-dragula.
*/
@NgModule({
  declarations: [NovoDragulaElement],
  exports: [NovoDragulaElement],
})
export class NovoDragulaModule {}
