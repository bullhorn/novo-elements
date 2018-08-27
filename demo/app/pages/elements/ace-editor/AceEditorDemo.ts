// NG2
import { Component } from '@angular/core';
// APP
let BasicDemoTpl = require('./templates/Basic.html');

const template = `
<div class="container">
    <h1>Ace Editor <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/ace-editor">(source)</a></small></h1>
    <p>Basic code editor using Ace Editor.</p>

    <h5>Basic Example</h5>
    <div class="example editor-demo">${BasicDemoTpl}</div>
    <code-snippet [code]="BasicDemoTpl"></code-snippet>
</div>
`;

@Component({
  selector: 'ace-editor-demo',
  template: template,
})
export class AceEditorDemoComponent {
  public BasicDemoTpl: string = BasicDemoTpl;
}
