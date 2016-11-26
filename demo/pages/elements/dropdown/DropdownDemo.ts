// NG2
import { Component } from '@angular/core';
// APP
let DropdownDemoTpl = require('./templates/DropdownDemo.html');

const template = `
<div class="container">
    <h1>Dropdown <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/dropdown">(source)</a></small></h1>
    <p>Dropdown allow users to take an action by selecting from a list of choices revealed upon opening a temporary menu.</p>

    <h2>Types</h2>

    <h5>Dropdown Menu</h5>
    <p>This is a simple dropdown menu.</p>
    <div class="example dropdown-demo">${DropdownDemoTpl}</div>
    <code-snippet [code]="DropdownDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'dropdown-demo',
    template: template
})
export class DropdownDemoComponent {
    private DropdownDemoTpl: string = DropdownDemoTpl;

    clickMe(data) {
        console.log('CLICKED!', data);
    }
}
