// NG2
import { Component } from '@angular/core';
// APP
import DragulaDemoTpl = require('./templates/DragulaDemo.html');
import DragulaModelDemoTpl = require('./templates/DragulaModelDemo.html');
// Vendor
import { NovoDragulaService } from './../../../../novo-elements';

const template = `
<div class="container">
    <h1>Dragula <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/dragula">(source)</a></small></h1>
    <p>Drag and Drop directives supported by dragula</p>

    <h5>Examples</h5>
    <p>Move stuff between these two containers. Note how the stuff gets inserted near the mouse pointer? Great stuff.</p>
    <div class="example" style="padding: 20px;">${DragulaDemoTpl}</div>
    <code-snippet [code]="DragulaDemoTpl"></code-snippet>

    <h5>Examples</h5>
    <p>Angular-specific example. Fancy some ngFor?</p>
    <div class="example" style="padding: 20px;">${DragulaModelDemoTpl}</div>
    <code-snippet [code]="DragulaModelDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'dragula-demo',
    template: template
})
export class DragulaDemoComponent {
    constructor(dragulaService: NovoDragulaService) {
        this.DragulaDemoTpl = DragulaDemoTpl;
        this.DragulaModelDemoTpl = DragulaModelDemoTpl;
        this.many = ['The', 'possibilities', 'are', 'endless!'];
        this.many2 = ['Explore', 'them'];

        dragulaService.dropModel.subscribe((value) => {
            this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe((value) => {
            this.onRemoveModel(value.slice(1));
        });
    }

    onDropModel(args) {
        let [el, target, source] = args; // eslint-disable-line
        // do something else
    }

    onRemoveModel(args) {
        let [el, source] = args; // eslint-disable-line
        // do something else
    }
}
