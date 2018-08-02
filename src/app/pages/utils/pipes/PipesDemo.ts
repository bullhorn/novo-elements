// NG2
import { Component } from '@angular/core';
// APP
let PluralizeDemoTpl = require('./templates/PluralizeDemo.html');

const template = `
<div class="container">
    <h1>Pipes</h1>
    <p>Utility and helpful pipes.</p>

    <h5>Pluralize <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/pipes/plural">(source)</a></small></h5>
    <p>Makes works plural or vice-versa</p>
    <div class="example pipes-demo">${PluralizeDemoTpl}</div>
    <code-snippet [code]="PluralizeDemoTpl"></code-snippet>
</div>
`;

@Component({
  selector: 'pipes-demo',
  template: template,
})
export class PipesDemoComponent {
  private PluralizeDemoTpl: string = PluralizeDemoTpl;
}
