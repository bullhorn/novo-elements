// NG2
import { Component } from '@angular/core';
// APP
let DropdownDemoTpl = require('./templates/DropdownDemo.html');
let CustomClassTpl = require('./templates/CustomClassDemo.html');
let AppendToBodyTpl = require('./templates/AppendToBodyDemo.html');
let KeepOpenTpl = require('./templates/KeepOpenDemo.html');
let AppendToBodyWithScrollTpl = require('./templates/AppendToBodyWithScrollDemo.html');
let CrazyLargeTpl = require('./templates/CrazyLargeDemo.html');

const template = `
<div class="container">
    <h1>Dropdown <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/dropdown">(source)</a></small></h1>
    <p>Dropdown allow users to take an action by selecting from a list of choices revealed upon opening a temporary menu.</p>

    <h2>Types</h2>

    <h5>Dropdown Menu</h5>
    <p>This is a simple dropdown menu.</p>
    <div class="example dropdown-demo">${DropdownDemoTpl}</div>
    <code-snippet [code]="DropdownDemoTpl"></code-snippet>

    <h5>Custom Class</h5>
    <p>You can have custom classes on the dropdown container that opens up by using the "containerClass" property.</p>
    <div class="example dropdown-demo">${CustomClassTpl}</div>
    <code-snippet [code]="CustomClassTpl"></code-snippet>

    <h5>Keep Open</h5>
    <p>You can set the "keepOpen" property on the "item" in order to keep it from closing the dropdown automatically.</p>
    <div class="example dropdown-demo">${KeepOpenTpl}</div>
    <code-snippet [code]="KeepOpenTpl"></code-snippet>

    <h5>Append To Body</h5>
    <p>You can append Dropdowns to the body if they are stuck in container that has overflow and you want the dropdown over everything.</p>
    <div class="example dropdown-demo">${AppendToBodyTpl}</div>
    <code-snippet [code]="AppendToBodyTpl"></code-snippet>

    <p>Sometimes you will have embedded dropdowns in containers that control custom scrolling, you can tie into those scroll events using a "parentScrollSelector".</p>
    <div class="example dropdown-demo-scroll">${AppendToBodyWithScrollTpl}</div>
    <code-snippet [code]="AppendToBodyWithScrollTpl"></code-snippet>
    <code-snippet [code]="AppendToBodyTpl"></code-snippet>

    <p>Craxy large dropdown to demonstrate how the smart positioning works.</p>
    <div class="example dropdown-demo">${CrazyLargeTpl}</div>
    <code-snippet [code]="CrazyLargeTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'dropdown-demo',
    template: template
})
export class DropdownDemoComponent {
    public DropdownDemoTpl: string = DropdownDemoTpl;
    public AppendToBodyTpl: string = AppendToBodyTpl;
    public KeepOpenTpl: string = KeepOpenTpl;
    public AppendToBodyWithScrollTpl: string = AppendToBodyWithScrollTpl;
    public CustomClassTpl: string = CustomClassTpl;
    public CrazyLargeTpl: string = CrazyLargeTpl;

    public items: string[] = [];

    constructor() {
        for (let i = 0; i < 50; i++) {
            this.items.push('ITEM!');
        }
    }

    public clickMe(data: string): void {
        console.log('CLICKED!', data); // tslint:disable-line
    }
}
