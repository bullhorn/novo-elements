// NG2
import { Component, OnInit } from '@angular/core';
// APP
let DragulaDemoTpl = require('./templates/DragulaDemo.html');
let DragulaModelDemoTpl = require('./templates/DragulaModelDemo.html');
let DragulaThresholdDemoTpl = require('./templates/DragulaThresholdDemo.html');
// Vendor
import { NovoDragulaService } from './../../../../platform/index';

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
    
    <h5>Examples</h5>
    <p>Drag Threshold example.</p>
    <div class="example" style="padding: 20px;">${DragulaThresholdDemoTpl}</div>
    <code-snippet [code]="DragulaThresholdDemoTpl"></code-snippet>
</div>
`;

@Component({
  selector: 'dragula-demo',
  template: template,
})
export class DragulaDemoComponent implements OnInit {
  private DragulaDemoTpl: string = DragulaDemoTpl;
  private DragulaModelDemoTpl: string = DragulaModelDemoTpl;
  private DragulaThresholdDemoTpl: string = DragulaThresholdDemoTpl;
  private many: Array<string> = ['The', 'possibilities', 'are', 'endless!'];
  private many2: Array<string> = ['Explore', 'them'];

  constructor(private dragulaService: NovoDragulaService) {
    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
    dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });
  }

  ngOnInit() {
    this.dragulaService.setOptions('threshold-bag', { deadzone: 25 });
  }

  onDropModel(args) {
    let [el, target, source] = args;
    // do something else
  }

  onRemoveModel(args) {
    let [el, source] = args;
    // do something else
  }
}
