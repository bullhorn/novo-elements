// NG2
import { Component } from '@angular/core';
// APP
let ValueDemoTpl = require('./templates/ValueDemo.html');

const template = `
<div class="container">
    <h1>Value/Details/Summary <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/value">(source)</a></small></h1>
    <p>Update component descriptions</p>

    <h5>Value/Details/Summary</h5>
    <p>Explain - TODO!!!</p>
    <div class="example value-demo">${ValueDemoTpl}</div>
    <code-snippet [code]="ValueDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'value-demo',
    template: template
})
export class ValueDemoComponent {
    private ValueDemoTpl:string = ValueDemoTpl;
    private toggleCount:number = 0;
    private checked:boolean = true;

    increment() {
        this.toggleCount++;
    }
}
